const createDialogConfig = users => {

    const usersButtons = users.slice(0, 20).map(user => {
      return {
        type: 'button',
        name: user.name,
        value: user._id,
        text: user.name,
        borderless: true,
      }
    });

    const dialogConfig = {
      title: 'Выберите пользователей',
      initialData: {
        'search': '',
        'users': usersButtons,
      },
      body: {
        type: 'panel',
        items: [
          {
            type: 'input',
            name: 'search',
            label: 'Поиск',
          },
          ...usersButtons,
        ],
      },

      buttons: [
        {
          type: 'cancel',
          text: 'Закрыть'
        },
        {
          type: 'submit',
          text: 'Искать'
        },
      ],

      onAction: function (_, details) {
        const userId = usersButtons.find(user => user.name === details.name).value;
        editor.insertContent(`<span><a href="user/${userId}"> @${details.name}</a> </span>`);
      },

      onSubmit: async function (api) {
        const data = api.getData().search;
        const filteredUsers = filterByParam(usersButtons, data);

        if (filteredUsers.length > 0) {

          api.redial({
            ...dialogConfig,
            body: {
              type: 'panel',
              items: [
                {
                  type: 'input',
                  name: 'search',
                  label: 'Поиск',
                },
                ...filteredUsers,
              ],
            },
          });
        } else {
          api.redial({
            ...dialogConfig,
            body: {
              type: 'panel',
              items: [
                {
                  type: 'input',
                  name: 'search',
                  label: 'Поиск',
                },
                {
                  type: 'alertbanner',
                  level: 'error',
                  text: 'Такого пользователя не существует',
                  icon: 'notice'
                },
              ],
            },
          })
        }
      }
    }
    return dialogConfig;
  }

  const openDialog = async function () {
    const response = await fetch(settings.API_URL);
    const { users } = await response.json();
 
    editor.windowManager.open(createDialogConfig(users));
  };

  return {
    getMetadata: function () {
      return {
        name,
      };
    }
  };