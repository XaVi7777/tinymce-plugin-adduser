import "regenerator-runtime/runtime.js";
import settings from '../settings';
import { filterByParam } from './utils';

export default (name) => tinymce.PluginManager.add(name, async editor => {

    const response = await fetch(settings.API_URL);
    const { users } = await response.json();

    editor.ui.registry.addAutocompleter('specialchars', {
        ch: '@',
        minChars: 1,
        columns: 1,
        maxResults: 10,
        fetch: async (pattern, maxResults) => {

            const matchedUsers = filterByParam(users, pattern.toLowerCase()).slice(0, maxResults);

            return new tinymce.util.Promise(resolve => {
                const results = matchedUsers.map(user => {
                    return {
                        value: `<a href="user/${user._id}">${user.name}</a>`,
                        text: user.name,
                    }
                });
                resolve(results);
            });
        },
        onAction: (autocompleteApi, rng, value) => {
            editor.selection.setRng(rng);
            editor.insertContent(value);
            autocompleteApi.hide();
        }
    });

    return {
        getMetadata: () => {
            return {
                name,
            };
        }
    };
});