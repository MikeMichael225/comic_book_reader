// Array of image blob urls 
const imgURLs = [];

(function () {
    // Drag and drop box for upload
    var dropZone = document.querySelector('.upload');
    // Upload <input> for mobile users
    var uploadDefault = document.querySelector('.upload-default-container');
    // Contains images and controls to jump between them.
    var outputContainer = document.querySelector('.output-container');

    //Checks if user is on mobile device or an PC
    if (mobileCheck() || mobileCheckRes()) {
        uploadDefault.classList.remove('hide');
        dropZone.classList.add('hide');
        setUploadEvents(uploadDefault);
    } else {
        uploadDefault.classList.add('hide');
        dropZone.classList.remove('hide');
        setDropEvents(dropZone);
    }

    outputContainer.classList.add('hide');

    // Listenes for <input type="file"> upload and reads the file when uploaded
    function setUploadEvents(element) {
        element.addEventListener('input', function(event) {
            readFile(event.target.files[0]);
        });
    }

    // Listenes for drag and drop upload and reads the file when uploaded
    function setDropEvents(element) {
        element.addEventListener('drop', function(event) {
            event.preventDefault();

            readFile(event.dataTransfer.items[0].getAsFile());

            event.target.classList.remove('over');
        });

        element.addEventListener('dragover', function (event) {
            event.preventDefault();
            element.classList.add('over');
        })

        element.addEventListener('dragleave', function (event) {
            event.preventDefault();
            element.classList.remove('over');
        })
    }

    function readFile(file) {
        const reader = new FileReader();
        reader.addEventListener('load', unzipAndDisplay);
        reader.readAsArrayBuffer(file);
        toggleElements();
    }

    // Unzips all of the images and call a function to display images on a screen
    function unzipAndDisplay(event) {
        // Array of image ArrayBuffers
        const imgs = [];

        JSZip.loadAsync(new Blob([event.target.result])).then(function (zip) {

            zip.forEach((path, entry) => {
                if (entry.dir == false) {
                    imgs.push(entry.async('arraybuffer').then(result => {
                        return result = {'path': path, 'img': result};
                    }));
                }
            });

            Promise.all(imgs).then((results) => {
                results.sort((a, b) => {
                    if (a.path > b.path)
                        return 1;
                    return -1;
                });
                results.forEach(result => {
                    // This line of code pushes converts ArrayBuffer of an image to blob then creates url for that blob object and pushes the url to array of images urls
                    imgURLs.push(URL.createObjectURL(new Blob([result.img])));
                });
                return update();
            });

        }).catch(err => {
            console.error(err);
            toggleElements();
        });
    }

    // Toggles hidden elements
    function toggleElements() {
        if (mobileCheck() || mobileCheckRes()) {
            uploadDefault.classList.toggle('hide');
        } else {
            dropZone.classList.toggle('hide');
        }

        outputContainer.classList.toggle('hide');
    }

    // Checks if user is on mobile phone by a browser
    function mobileCheck() {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    // Checks if user is on mobile phone by a resolution
    function mobileCheckRes() {
        return ((window.innerWidth <= 800) && (window.innerHeight <= 600));
    }
}());