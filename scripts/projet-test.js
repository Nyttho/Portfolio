export async function fetchProjects(path) {
    const res = await fetch(path);
    const projects = await res.json();
    projects.forEach(displayProject);
}

function displayProject(projectDatas) {
    const { name, description, technologies, learning, link, illustration } = projectDatas;

    const section = document.querySelector(".projects-container");
    const project = createElementWithClasses("div", ["project-test"]);
    const titleContainer = createElementWithClasses("div", ["title-container-test"]);
    const title = createElementWithClasses("h3", ["title-test"], name);
    const arrow = createElementWithClasses("i", ["fa-solid", "fa-circle-chevron-down", "arrow"]);

    arrow.addEventListener("click", () => {
        const collapsible = project.querySelector(".collapsible");
        if (collapsible) collapsible.classList.toggle("opened");
        arrow.classList.toggle("active");
    });

    const imgContainer = createElementWithClasses("div", ["img-container-test"]);
    const img = createElementWithAttributes("img", {
        src: illustration,
        alt: `projet ${name}`,
        loading: 'lazy'
    });

    const collapsible = createElementWithClasses("div", ["collapsible"]);
    const content = createElementWithClasses("div", ["content-test"]);
    const tags = createListWithItems("ul", technologies, "tags-list-test", "tag");
    const descrContent = createElementWithClasses("p", ["content-p-test"], description);
    const learningSkills = createListWithItems("ul", learning, "skills-list-test", "skill");
    const ancre = createElementWithAttributes("a", {
        href: link,
        target: "_blank",
        class: "code-link"
    }, "Lien vers le code du projet");

    section.appendChild(project);
    project.append(imgContainer, titleContainer, collapsible);
    titleContainer.append(title, arrow);
    imgContainer.appendChild(img);
    collapsible.appendChild(content);
    content.append(tags, descrContent, learningSkills, ancre);
}

function createElementWithClasses(tag, classNames, textContent) {
    const element = document.createElement(tag);
    classNames.forEach(className => element.classList.add(className));
    if (textContent) element.textContent = textContent;
    return element;
}

function createElementWithAttributes(tag, attributes, textContent) {
    const element = document.createElement(tag);
    for (let key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            element.setAttribute(key, attributes[key]);
        }
    }
    if (textContent) element.textContent = textContent;
    return element;
}

function createListWithItems(tag, items, listClass, itemClass) {
    const list = createElementWithClasses(tag, [listClass]);
    items.forEach(item => {
        const listItem = createElementWithClasses("li", [itemClass], item);
        list.appendChild(listItem);
    });
    return list;
}
