const tabs = document.querySelectorAll(".tabheader__item");
const tabsParent = document.querySelector(".tabheader__items");
const tabContent = document.querySelectorAll(".tabcontent");

console.log(tabs, "tabs")
console.log(tabsParent, "tabsParent")
console.log(tabContent, "tabContent")

const hideTabContent = (i) => {
    tabContent.forEach((item) => {
        item.style.display = "none";
    });
    tabs.forEach((item ) => {
      item.classList.remove("tabheader__item_active");
    });
};

const showTabContent = (i) => {
    tabContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
};

hideTabContent();
showTabContent(0);


tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("tabheader__item")){
        tabs.forEach((item, i) => {
            if (target === item) {
                console.log(i);
                hideTabContent();
                showTabContent(i);
            }
        })
    }
});

const infinity0 = () => {
    hideTabContent(3)
    showTabContent(0)
};
const infinity1 = () => {
    hideTabContent(0)
    showTabContent(1)
};
const infinity2 = () => {
    hideTabContent(1)
    showTabContent(2)
};
const infinity3 = () => {
    hideTabContent(2)
    showTabContent(3)
};


const infinity = () => {
        setTimeout(infinity1, 2000);
        setTimeout(infinity2, 4000);
        setTimeout(infinity3, 6000);
        setTimeout(infinity0, 8000);
};


setInterval(infinity, 8000);
infinity();




const modal = document.querySelector(".modal");
const modalTrigger = document.querySelector(".btn_white");
const closeModalBtn = document.querySelector(".modal__close");

const openModal = () => {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
};

const closeModal = () => {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
};

modalTrigger.addEventListener("click", openModal);

modal.addEventListener("click", (event) => {
    if (event.target == modal){
        closeModal();

    }
});

closeModalBtn.addEventListener("click", closeModal)


const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

const end = 3500;

window.addEventListener('scroll', () => {
   if (getTop() > end){
       openModal();
   };
});




const forms = document.querySelectorAll("form");
const message = {
  loading: "Идет загрузка",
  success: "Спасибо, скоро свяжемся !",
  fail: "Что-то пошло не так",
};

forms.forEach((item) => {
  bindPostData(item);
});


const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });

  return res;
};


function bindPostData(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const messageBlock = document.createElement("div");
    messageBlock.textContent = message.loading;
    form.append(messageBlock);

    const formData = new FormData(form);
    const object = {};

    formData.forEach((item, i) => {
      object[i] = item;
    });

    fetch("server.php", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(object),
    });

    postData("server.php", JSON.stringify(object))
      .then((data) => {
        console.log(data);
        messageBlock.textContent = message.success;
      })
      .catch(() => {
        console.log("error");
        messageBlock.textContent = message.success;
      })
      .finally(() => {
        console.log("ok");
      });
  });
}

