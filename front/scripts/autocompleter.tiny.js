import "regenerator-runtime/runtime.js";
import settings from '../settings';
import { filterByParam } from './utils';



export default (name) => tinymce.PluginManager.add(name, function (editor) {

    editor.ui.registry.addAutocompleter('specialchars', {
        ch: '@',
        minChars: 1,
        columns: 1,
        maxResults: 10,
        fetch: async function (pattern, maxResults) {
            const response = await fetch(settings.API_URL);
            const { users } = await response.json();
            const matchedUsers = filterByParam(users, pattern.toLowerCase()).slice(0, maxResults);

            return new tinymce.util.Promise(resolve => {
                const results = matchedUsers.map(user => {
                    return {
                        value: `<a href="user/${user._id}">@${user.name}</a>`,
                        text: user.name,
                    }
                });
                resolve(results);
            });
        },
        onAction: function (autocompleteApi, rng, value) {
            editor.selection.setRng(rng);
            editor.insertContent(value);
            autocompleteApi.hide();
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