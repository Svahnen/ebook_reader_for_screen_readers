document.getElementById("file").addEventListener('change', loadBook);

function loadBook() {
    file = document.getElementById("file").files[0];
    document.getElementById("text-here").innerHTML = "";
    renderBook()
}

function renderBook() {
    book = ePub(file);
    rendition = book.renderTo("area", { height: 999999 });
    displayed = rendition.display();
    document.getElementById("front-page-button").style.display = "flex";
    setTimeout(showAllChapters, 1000);
    setTimeout(fixText, 1000);
}

function fixText() {
    document.getElementById("text-here").innerHTML = rendition.getContents()[0].content.innerHTML
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
    document.getElementById("text-here").scrollIntoView();
    setTimeout(fixText, 1000);
}
