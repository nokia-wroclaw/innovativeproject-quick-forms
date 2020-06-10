export default function GetPendingFormID(){
    const urlData = window.location.href.split('/');
    return urlData[urlData.length - 1];
}

