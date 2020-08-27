import settings from '../settings';

export default (name) => tinymce.PluginManager.add(name, function (editor) {

  const createDialogConfig = users => {

    const usersButtons = users.map(user => {

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
        const userId =  usersButtons.find(user => user.name === details.name).value;
        editor.insertContent(`<span><a href="user/${userId}"> @${details.name}</a> </span>`);
      },

      onSubmit: function (api) {
        const data = api.getData().search;
        const filteredUsers = usersButtons.filter(user => user.name.toLowerCase().indexOf(data) === 0);

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

  editor.on('keydown', event => {
    if (event.code == 'Digit2' && (event.shiftKey || event.metaKey)) {

      const text = editor.getContent({ format: 'text' });
      const lastSymbolInEditor = text[text.length - 1].trim();

      if (lastSymbolInEditor === '') {
        event.preventDefault();
        openDialog();
      }
    }
  });

  return {
    getMetadata: function () {
      return {
        name,
      };
    }
  };
});