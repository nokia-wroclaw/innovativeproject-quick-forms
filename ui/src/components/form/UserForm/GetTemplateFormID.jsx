export default function GetTemplateFormID() {
    const urlData = window.location.href.split('/');
    return urlData[urlData.length - 2];
}