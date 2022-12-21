document.getElementById("file").addEventListener('change', loadBook);

let book;
let rendition;
let displayed;

function loadBook() {
    let file = document.getElementById("file").files[0];
    book = ePub(file);
    rendition = book.renderTo("area", { height: 100000 });
    displayed = rendition.display();
    document.getElementById("front-page-button").style.display = "flex";
    setTimeout(fixText, 1000);
    setTimeout(showAllChapters, 2000);
}

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
    document.getElementById("text-here").scrollIntoView();
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
    document.getElementById("text-here").scrollIntoView();
}
