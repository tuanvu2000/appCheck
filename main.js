const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const CHECKER_STORAGE_KEY = 'TuV_CHECKER';

const iconMenu = $('.header__menu-mobile');
const iconSetting = $('.header__menu');
const iconClose = $('.nav__close');
const overlay = $('.overlay');
const navMenu = $('.header__nav');
const navItems = $$('.nav__item');
const navList = $('.nav__list'); 
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
    topics: [],
    urlInput: function(callback) {
        fetch("./listword.json")
            .then(response => response.json())
            .then(callback);
    },
    getData: function() {
        return this.urlInput(function(data) {
            return app.topics = data
        })
    },
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(CHECKER_STORAGE_KEY, JSON.stringify(this.config));
    },
    handleEvents: function() {
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
                // render nội dung và ẩn nó đi
                _this.renderTopic();
                _this.renderUnit();

                // Đóng mở dropdown
                this.classList.toggle('show')
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

                // Kiểm tra nếu là button Random thì thực thi lệnh dưới
                if (this.innerText === 'Random') {
                    var htmls = _this.renderTest(_this.btnRandom());
                    contentBlock.classList.add('none');
                    form.innerHTML = htmls;
                    form.appendChild(submit);
                }
            };
        });

        // Xử lý khi click vào btn submit và kiểm tra input
        submit.onclick = function(event) {
            event.preventDefault();
            const findValue = event.target.parentElement.querySelectorAll('.test__input')
            
            // Duyệt qua từng mục và kiểm tra kết quả
            findValue.forEach((input, index) => {
                _this.checkValueInput(input, index);
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
    renderUnit: function() {
        var htmls = '';
        this.topics.forEach((topic, indexa) => {
            topic.units.map((unit, indexb) => {
                htmls += `
                    <div class="item__option" data-index="${indexa+'|'+indexb}">${unit.number}</div>
                `
            })
        })
    
        dropOptions[0].innerHTML = htmls;
    },
    renderTopic: function() {
        var htmls = '';
        this.topics.map((topic, index) => {
            htmls += `
                <div class="item__option" data-index="${index}">${topic.name}</div>
            `;
        })

        dropOptions[1].innerHTML = htmls;
    },
    renderTest: function(selector) {
        var output = '';
        var arrNumRandom = [];
        var numRandom;
        var typeWord = '';
        // tạo một điểm dừng khi duyệt qua vòng lặp
        var maxLoop = this.maxVocabulary <= selector.length ? this.maxVocabulary : selector.length;

        // Tạo một dãy random vocabulary không theo thứ tự
        do {
            numRandom = Math.floor(Math.random() * selector.length)
            if (!arrNumRandom.includes(numRandom)) {
                arrNumRandom.push(numRandom); // Đẩy giá trị random vào mảng
                this.arrVocabulary.push(selector[numRandom]); // thêm dữ liệu từ mảng dựa vào số random
                typeWord = this.typeCheck() // tạo biến chứa type ban đầu
                this.arrTypes.push(typeWord) // đẩy type đã tạo vào mảng để kierm tra
                output += `
                    <div class="test__group">
                        <p class="test__word">${selector[numRandom][typeWord]} (${selector[numRandom].type})</p>
                        <input type="text" name="" class="test__input">
                        <p class="test_message"></p>
                    </div>
                `;
            }
            // nếu sô từ trong mảng vượt quá số yêu cầu thì dừng
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
    checkValueInput: function(input, index) {
        const value = input.value.toLowerCase();
        var typeValue = this.arrTypes[index] === 'word' ? 'translate' : 'word';
        const valueCheck = this.arrVocabulary[index][typeValue];
        if (value.trim() === valueCheck) {
            this.gradeCheck++;
        } else {
            input.parentElement.classList.add('incorrect')
            input.nextElementSibling.innerText = `${valueCheck}`

        }
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
    showDefault: function() {
        // Lấy giá trị mặc định hoặc trong localStorage hiển thị ra
        quantity.value = this.maxVocabulary;
        navItems[this.typeTest].classList.add('active')

        // Edit cho console không phải là mobile
        iconSetting.style.right = navMenu.offsetWidth + 'px';
        navList.style.width = navMenu.offsetWidth + iconSetting.offsetWidth + 'px';
    },
    start: function() {
        // Gán cấu hình vào ứng dụng
        this.loadConfig();
        
        // Lấy dữ liệu từ file JSON
        this.getData();

        // Xử lý các sự kiện
        this.handleEvents();

        // Hiển thị giá trị ban đầu khi vào ứng dụng của setting
        this.showDefault();
    }
};

app.start();