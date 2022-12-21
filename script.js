var book = ePub("book2.epub");
var rendition = book.renderTo("area", { height: 100000 });
var displayed = rendition.display();
let currentChapter = 0;

function fixText() {
    document.getElementById("text-here").innerHTML = rendition.getContents()[0].documentElement.childNodes[2].innerHTML
}

function nextChapter() {
    rendition.next();
    fixText();
}

function prevChapter() {
    rendition.prev();
    fixText();
}

function home() {
    rendition.display();
    setTimeout(fixText, 1000);
}

function showAllChapters() {
    document.getElementById("all-chapters").innerHTML = "";
    for (let i = 0; i < book.navigation.toc.length; i++) {
        document.getElementById("all-chapters").innerHTML += "<button onclick='goToChapter(" + i + ")'>" + book.navigation.toc[i].label + "</button><br>";
    }
}

function goToChapter(chapter) {
    rendition.display(book.navigation.toc[chapter].href);
    setTimeout(fixText, 1000);
}

setTimeout(fixText, 1000)
setTimeout(showAllChapters, 2000)