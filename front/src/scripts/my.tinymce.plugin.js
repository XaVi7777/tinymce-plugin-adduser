import settings from '../../settings';

export default (name) => tinymce.PluginManager.add(name, editor => {

  const createDialogConfig = () => {

    const dialogConfig = {
      title: 'Поиск пользователей',
      body: {
        type: 'panel',
        items: [
          {
            type: 'input',
            name: 'search',
            label: 'Поиск',
          },
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

      onAction: (_, details) => {
        editor.insertContent(`<span><a href="user/"> @${details.name}</a> </span>`);
      },

      onSubmit: async api => {
        const data = api.getData().search;
        api.setData({
          search: data,
        });
        const response = await fetch(settings.API_URL + '/' + data);
        const { users } = await response.json();

        const usersButtons = users.map(user => {
          return {
            type: 'button',
            name: user.name,
            value: user._id,
            text: user.name,
            borderless: true,
          }
        });

        if (usersButtons.length > 0) {
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
                ...usersButtons,
              ],
              initialData: {
                'search': data,
              },
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
      },
    }
    return dialogConfig;
  }

  editor.ui.registry.addButton('example', {
    icon: 'user',

    onAction: () => {
      editor.windowManager.open(createDialogConfig())
    }
  });
});