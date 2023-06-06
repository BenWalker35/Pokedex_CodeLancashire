import Pokemon, { pokemons } from "./PokemonData.js";
import {
    setAttr, addClass, addClasses, changeClass,
    isVisible, rmvClass, 
} from "./Additions.js";

const body = document.querySelector("body");
const list = document.querySelector("ul");
const cards = new Array(Pokemon.total);

/* HTML for individual Cards */
const cardHtml = `
<div class="card loading">
        <img>
        <div class="info">
            <span class="id">1</span>
            <span class="name">Pikachu</span>
        </div>
    </div>`

const entries = new Array(Pokemon.total);


const entryHtml = `
<span class="id">1</span>
        <div class="main">
            <div>
                <img>
                <h2 class="name"></h2>
            </div>
                <div class="types">
                    <span class="type1 type">Normal</span>
                </div>
            </div>
        </div>`


function setupCurtain(curtain) {
    addClass(curtain, "curtain");
    curtain.onanimationend = e => {
        if(e.animationName == "fade-out")
            body.removeChild(curtain);
    }

    curtain.onclick = () => {
        openCurtain();
        closeEntry();
    }
}

function createCurtain() {
    const curtain = document.createElement("div");
    setupCurtain(curtain);

    return curtain;
}

const curtain = createCurtain();


function createTypeSpan(type) {
    const type2 = document.createElement("span");
    addClasses(type2, "type", type);

    return type2;
}


async function loadEntryData(i) {
    const p = pokemons[i];

    if(p.entryData) return;
    if(!p.cardData) await loadCardData(i);
    const e = entries[i];
    
    const {
        id, name, img, types, type1,
    
    } = e.fields;

    id.textContent = p.id;
    name.textContent = p.name;
    img.src = p.maleSprite;
    type1.textContent = p.type1;
    setAttr(e, "data-type1", p.type1);
    if(p.type2) {
        const type2 = createTypeSpan("type2");
        type2.textContent = p.type2;
        setAttr(e, "data-type2", p.type2);
        types.appendChild(type2);
    }
}


function closeCurtain() {
    changeClass(curtain, "fade-out", "fade-in");
    body.appendChild(curtain);
}


function openCurtain() {
    changeClass(curtain, "fade-in", "fade-out");
}


function closeEntry() {
    const e = document.querySelector(".entry");
    changeClass(e, "slide-up", "slide-down");
}


function openEntry(i) {
    const e = entries[i];

    closeCurtain();
    changeClass(e, "slide-down", "slide-up");
    body.appendChild(e);
    loadEntryData(i);
}


function storeCardFields(card) {
    card.fields = {
        id: card.querySelector(".id"),
        name: card.querySelector(".name"),
        img: card.querySelector("img")
    };
}


function setupCard(card) {
    card.innerHTML = cardHtml;
    storeCardFields(card);
}


function createCard() {
    const card = document.createElement("li");
    setupCard(card);

    return card;
}


export function createCards() {
    for(let i = 0; i < cards.length; i++) {
        cards[i] = createCard();
        cards[i].onclick = () => openEntry(i);
        list.appendChild(cards[i]);
    }
}


function storeEntryFields(entry) {
    entry.fields = {
        id: entry.querySelector(".id"),
        name: entry.querySelector(".name"),
        img: entry.querySelector("img"),
        types: entry.querySelector(".types"),
        type1: entry.querySelector(".type1"),
    };
}


function setupEntry(entry) {
    addClasses(entry, "entry", "loading");
    setAttr(entry, "data-type1", "normal");
    entry.innerHTML = entryHtml;
    storeEntryFields(entry);
    entry.onanimationend = e => {
        if(e.animationName == "slide-down")
            body.removeChild(entry);
    };
}


function createEntry() {
    const entry = document.createElement("div");
    setupEntry(entry);

    return entry;
}


export function createEntries() {
    for(let i = 0; i < entries.length; i++) {
        entries[i] = createEntry();
    }
}


async function loadCardData(i) {
    const c = cards[i];
    const p = pokemons[i];
    await p.storeCardData();
    setAttr(c.firstElementChild, "data-type1", p.type1);
    if(p.type2) setAttr(c.firstElementChild, "data-type2", p.type2);
    setAttr(c.fields.img, "src", p.maleSprite);
    c.fields.id.textContent = p.id;
    c.fields.name.textContent = p.name;
}


export function loadPokemons() {
    for(let i = 0; i < cards.length; i++) {
        loadCardData(i);
    }
}