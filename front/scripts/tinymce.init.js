import tinymce from 'tinymce';
// Default icons are required for TinyMCE 5.3 or above
import 'tinymce/icons/default';

// A theme is also required
import 'tinymce/themes/silver';

// Any plugins you want to use has to be imported
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';

export default () => tinymce.init({
    selector: 'textarea',
    plugins: ['advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount auctocompleter example',
    ],
    toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        ' example | help',
    height: 800,
    auto_focus: 'textarea',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
});