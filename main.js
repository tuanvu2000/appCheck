import data from "./listword.json" assert { type: "json" };

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const CHECKER_STORAGE_KEY = 'TuV_CHECKER';

const iconMenu = $('.header__menu');
const iconClose = $('.nav__close');
const overlay = $('.overlay');
const navMenu = $('.header__nav');
const navItems = $$('.nav__item');
const quantity = $('.nav__item-input')
const dropItem = $$('.item__title');
const dropOptions = $$('.item__dropdown');
const contentBlock = $('.content__block');
const form = $('.content__form');
const submit = $('.test__submit');
const grade = $('.test__grade');

const app = {
    currentTopic: '',
    currentIndex: 0,
    arrVocabulary: [],
    arrTypes: [],
    maxVocabulary: 10,
    gradeCheck: 0,
    typeTest: 0,
    config: JSON.parse(localStorage.getItem(CHECKER_STORAGE_KEY)) || {},
    topics: data.topics,
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(CHECKER_STORAGE_KEY, JSON.stringify(this.config));
    },
    handle: function() {
        const _this = this;
        var drop;

        // Xử lý khi click vào icon Menu
        iconMenu.addEventListener('click', function() {
            navMenu.classList.add('show');
            overlay.classList.add('show');
        })
        
        // Xử lý khi click vào icon Close
        iconClose.addEventListener('click', function() {
            navMenu.classList.remove('show');
            overlay.classList.remove('show');
        })
        
        // Xử lý khi click vào màn overlay
        overlay.addEventListener('click', function() {
            if (this.matches('.overlay.show')) {
                this.classList.remove('show');
                navMenu.classList.remove('show');
            }
        })
        
        // Xử lý khi click vào các button ở màn hình chính
        dropItem.forEach(item => {
            item.onclick = function() {
                this.classList.toggle('show')
                // Đóng mở dropdown
                if (this.nextElementSibling) {
                    drop = this.nextElementSibling;
                    drop.classList.toggle('show');

                    // Khi click vào option thì lấy giá trị
                    // Hiển thị ra nội dung để kiểm tra
                    if (drop.matches('.item__dropdown.show')) {
                        const options = drop.querySelectorAll('.item__option');
                        options.forEach(option => {
                            option.onclick = function() {
                                _this.currentIndex = this.dataset.index;
                                _this.currentTopic = this.innerText;
                                contentBlock.classList.add('none');
                                _this.loadContent(_this.currentTopic, _this.currentIndex)
                            };
                        });
                    }
                }
                if (this.innerText === 'Random') {
                    var htmls = _this.renderTest(_this.btnRandom());
                    contentBlock.classList.add('none');
                    form.innerHTML = htmls;
                    form.appendChild(submit);
                }
            };
        });

        // Khi click vào option thì lưu lại giá trị để tìm
        /*document.onclick = function(event) {
            if (event.target.nextElementSibling) {

                const siblingEl = event.target.nextElementSibling;
                if(siblingEl.matches('.item__dropdown.show')) {
                    const options = siblingEl.querySelectorAll('.item__option');
                    options.forEach(option => {
                        option.onclick = function() {
                            // setTimeout(() => {
                                _this.currentTopic = this.innerText;
                                _this.currentIndex = this.dataset.index;
                                contentBlock.classList.add('none');
                                _this.loadContent(_this.currentTopic, _this.currentIndex)
                            // }, 500);
                        };
                    });
                }
            }
        };*/

        // Xử lý khi click vào btn submit và kiểm tra input
        submit.onclick = function(event) {
            event.preventDefault();
            const findValue = event.target.parentElement.querySelectorAll('.test__input')
            findValue.forEach((input, index) => {
                const value = input.value.toLowerCase();
                var typeValue = _this.arrTypes[index] === 'word' ? 'translate' : 'word';
                const valueCheck = _this.arrVocabulary[index][typeValue];
                if (value.trim() === valueCheck) {
                    _this.gradeCheck++;
                } else {
                    input.parentElement.classList.add('incorrect')
                }
            });
            
            event.target.classList.add('hide')
            grade.innerText = `TỔNG SỐ CÂU ĐÚNG: ${_this.gradeCheck}/${_this.arrVocabulary.length}`;
            form.appendChild(grade);
        };

        // Xử lý khi click vào nav để lựa chọn loại kiểm tra
        navItems.forEach((item, index) => {
            item.onclick = function() {
                const itemActive = this.parentElement.querySelector('.nav__item.active');
                itemActive.classList.remove('active');
                item.classList.add('active');
                _this.typeTest = index;
                _this.setConfig('typeTest', _this.typeTest); 
            }
        });
        
        // Xử lý khi thay đổi số lượng câu
        quantity.onblur = function() {
            _this.maxVocabulary = Number(this.value);
            _this.setConfig('maxVocabulary', _this.maxVocabulary);
        }

        
    },
    loadContent: function(selector, index) {
        var htmls = '';
        var index = this.currentIndex.split('|');
        var indexTopic = index[0];
        var indexUnit = Number(index[1]);
        var units = this.topics[indexTopic].units;
        var arrUnits = [];
        
        if (this.topics[indexTopic].name === selector) {
            for (var unit of units) {
                unit.vocabulary.forEach(word => {
                    arrUnits.push(word)
                })
            }
            htmls = this.renderTest(arrUnits);
        } 
        else {
            for (var unit of units) {
                if (unit.number === (indexTopic*5 + indexUnit + 1)) {
                    htmls = this.renderTest(unit.vocabulary)
                }
            }
        }
        form.innerHTML = htmls;
        form.appendChild(submit);
    },
    loadConfig: function() {
        if (this.config.hasOwnProperty('typeTest')) {
            this.typeTest = this.config.typeTest;
        }
        
        if (this.config.hasOwnProperty('maxVocabulary')) {
            this.maxVocabulary = this.config.maxVocabulary;
        }
    },
    renderTopic: function() {
        var htmls = '';
        this.topics.map((topic, index) => {
            htmls += `
                <div class="item__option" data-index="${index}">${topic.name}</div>
            `;
        })
        
        dropOptions[0].innerHTML = htmls;
    },
    renderUnit: function() {
        var htmls = '';
        this.topics.forEach((topic, indexa) => {
            topic.units.map((unit, indexb) => {
                htmls += `
                    <div class="item__option" data-index="${indexa+'|'+indexb}">${unit.number}</div>
                `
            })
        })
    
        dropOptions[1].innerHTML = htmls;
    },
    renderTest: function(selector) {
        var output = '';
        var arrNumRandom = [];
        var numRandom;
        var typeWord = '';
        var maxLoop = this.maxVocabulary <= selector.length ? this.maxVocabulary : selector.length;

        do {
            numRandom = Math.floor(Math.random() * selector.length)
            if (!arrNumRandom.includes(numRandom)) {
                arrNumRandom.push(numRandom);
                this.arrVocabulary.push(selector[numRandom]);
                typeWord = this.typeCheck()
                this.arrTypes.push(typeWord)
                output += `
                    <div class="test__group">
                        <p class="test__word">${selector[numRandom][typeWord]}</p>
                        <input type="text" name="" class="test__input">
                    </div>
                `;
            }
            if (this.arrVocabulary.length === maxLoop) break;
        } while (arrNumRandom.includes(numRandom))

        return output;
    },
    typeCheck: function() {
        var arrTypes = ['word', 'translate'];
        var types = '';
        var numRan;
        if (this.typeTest < 2) { 
            types = arrTypes[this.typeTest]
        } else {
            numRan = Math.floor(Math.random() * 2);
            types = arrTypes[numRan];
        }

        return types;
    },
    btnRandom: function() {
        const totalVocabulary = [];
        for (var topic of this.topics) {
            for (var unit of topic.units) {
                for (var words of unit.vocabulary)
                    totalVocabulary.push(words)
            }
        }
        return totalVocabulary;
    },
    start: function() {
        // Gán cấu hình vào ứng dụng
        // this.loadConfig();

        // Xử lý các sự kiện
        this.handle();
        
        // hiển thị các topic ra màn hình UI
        this.renderTopic();
        this.renderUnit();

        // Tùy chỉnh giá trị khi click vào btn Random
        this.btnRandom();

        // Hiển thị giá trị ban đầu khi vào ứng dụng của setting
        quantity.value = this.maxVocabulary;
        navItems[this.typeTest].classList.add('active')
    }
};

app.start();