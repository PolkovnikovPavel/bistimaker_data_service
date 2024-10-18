function onClickBtn() {
    if (btn.className === 'btn btn-primary') {
        btn.className = 'btn btn-warning'
    } else {
        btn.className = 'btn btn-primary'
    }

    let obj = document.getElementById("text1");
    let num = obj.textContent.split(': ')[1];
    num = Number(num) + k;
    obj.textContent = 'Количество нажатий: ' + num
    if (num === 100) {
        k = 2;
        document.getElementById("1").textContent = 'Ладно ладно...\nБудет небольшое изменение, теперь я буду давать за каждый и так бесполезный клик на один бал больше, радуйся... и жди, вдруг ещё, что то изменется.'
    }
    if (num >= 50) {
        let page = document.getElementById(2)
        if (num % 5 === 0) {
            page.textContent = 'Ой нет, тоесть тут должно было быть написанно, что надо набрать ' + (num + 15) + ' очков -_-';
        }
    }
}

async function onClickImg() {
    onClickBtn();
}


async function sleep(ms) {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms);
    });
}

async function main() {
    while (1) {
        await sleep(200);
        console.log('123');
        if (condition) {

        }
    }
}


function px(p) {
    return canvas.width * p / 100
}

function py(p) {
    return canvas.height * p / 100
}


let btn = document.getElementById('btn1');
// btn.onclick = onClickBtn
btn.addEventListener('click', onClickImg);
document.getElementById('img1').onclick = onClickImg;
// document.getElementById('img1').innerHTML = 0
let k = 1;


