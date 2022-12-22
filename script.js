document.getElementById("file").addEventListener('change', loadBook);

// Auto detect DOM changes an update the UI
document.getElementById("area").addEventListener("DOMNodeInserted", function (ev) {
    setTimeout(() => {
        fixText();
        getChapter()
    }, 1000);
}, false);


function loadBook() {
    file = document.getElementById("file").files[0];
    document.getElementById("text-here").innerHTML = "";
    renderBook()
}

function renderBook() {
    book = ePub(file);
    rendition = book.renderTo("area", { height: 999999 });
    displayed = rendition.display();
    setTimeout(() => {
        showHidden()
        showAllChapters();
        getChapter()
    }, 2000)
}

function showHidden() {
    document.getElementById("front-page-button").style.display = "block";
    document.getElementById("top").style.display = "block";
    document.getElementById("chapter").style.display = "block";
    document.getElementById("prev").style.display = "block";
    document.getElementById("next").style.display = "block";


}

function fixText() {
    document.getElementById("text-here").innerHTML = rendition.getContents()[0].content.innerHTML
}

function nextChapter() {
    rendition.next();
    setTimeout(() => {
        document.getElementById("text-here").scrollIntoView();
    }, 1500)
}

function prevChapter() {
    rendition.prev();
    setTimeout(() => {
        document.getElementById("text-here").scrollIntoView();
    }, 1500)
}

function home() {
    rendition.display();
    setTimeout(() => {
        document.getElementById("text-here").scrollIntoView();
    }, 1500)
}

function showAllChapters() {
    document.getElementById("all-chapters").innerHTML = "";
    for (let i = 0; i < book.navigation.toc.length; i++) {
        document.getElementById("all-chapters").innerHTML += "<button onclick='goToChapter(" + i + ")'>" + book.navigation.toc[i].label + "</button><br>";
    }
}

function goToChapter(chapter) {
    rendition.display(book.navigation.toc[chapter].href);
    setTimeout(() => {
        document.getElementById("text-here").scrollIntoView();
    }, 1500)
}

function getChapter() {
    document.getElementById("chapter").innerHTML = rendition.getContents()[0].document.title;
}