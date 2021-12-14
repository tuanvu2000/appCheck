// import data from "./listword.json" assert { type: "json" };

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
    topics: [
        {
            name: 'Personal',
            units: [
                {
                    number: 1,
                    vocabulary: [
                        {
                            word: 'skill',
                            translate: 'kỹ năng',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'follow',
                            translate: 'theo đuổi',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'culture',
                            translate: 'văn hóa',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'abroad',
                            translate: 'ở nước ngoài',
                            type: 'trạng từ (Adv)'
                        },
                        {
                            word: 'language',
                            translate: 'ngôn ngữ',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'shy',
                            translate: 'nhút nhát',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'foreigner',
                            translate: 'người nước ngoài',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'understand',
                            translate: 'hiểu',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'confident',
                            translate: 'tự tin',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'improve',
                            translate: 'cải thiện',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'progress',
                            translate: 'tiến bộ',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'communicate',
                            translate: 'giao tiếp',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'vocabulary',
                            translate: 'từ vựng',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'speaker',
                            translate: 'người nói',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'certificate',
                            translate: 'giấy chứng nhận',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'course',
                            translate: 'khóa học',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'original',
                            translate: 'nguyên bản',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'visitor',
                            translate: 'khách tham quan',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'idea',
                            translate: 'ý tưởng',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'conversation',
                            translate: 'cuộc trò chuyện',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'topic',
                            translate: 'chủ đề',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'difficulty',
                            translate: 'khó khăn',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'beginner',
                            translate: 'người mới học',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'scared',
                            translate: 'sợ hãi',
                            type: 'tính từ (Adj)'
                        },
                    ]
                },
                {
                    number: 2,
                    vocabulary: [
                        {
                            word: 'kindergarten',
                            translate: 'mẫu giáo',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'primary',
                            translate: 'tiểu học',
                            type: 'trạng từ (Adj)'
                        },
                        {
                            word: 'secondary',
                            translate: 'trung học',
                            type: 'trạng từ (Adj)'
                        },
                        {
                            word: 'mathematics',
                            translate: 'toán học',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'engineering',
                            translate: 'ngành kỹ sư',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'subject',
                            translate: 'môn học',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'science',
                            translate: 'khoa học',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'popular',
                            translate: 'thịnh hành',
                            type: 'trạng từ (Adj)'
                        },
                        {
                            word: 'absent',
                            translate: 'vắng mặt',
                            type: 'trạng từ (Adj)'
                        },
                        {
                            word: 'art',
                            translate: 'nghệ thuật',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'attend',
                            translate: 'tham dự',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'term',
                            translate: 'học kỳ',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'grade',
                            translate: 'điểm số',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'continue',
                            translate: 'tiếp tục',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'announce',
                            translate: 'thông báo',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'nervous',
                            translate: 'lo lắng',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'revise',
                            translate: 'ôn tập',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'assignment',
                            translate: 'bài tập',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'enroll',
                            translate: 'nhập học',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'succeed',
                            translate: 'thành công',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'uniform',
                            translate: 'đồng phục',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'memorise',
                            translate: 'học thuộc',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'curriculum',
                            translate: 'chương trình giảng dạy',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'dropout',
                            translate: 'người bỏ học',
                            type: 'danh từ (N)'
                        },
                    ]
                },
                {
                    number: 3,
                    vocabulary: [
                        {
                            word: 'special',
                            translate: 'đặc biệt',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'call',
                            translate: 'gọi',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'nickname',
                            translate: 'biệt danh',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'maening',
                            translate: 'ý nghĩa',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'know',
                            translate: 'biết',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'surname',
                            translate: 'họ',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'hometown',
                            translate: 'quê',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'tell',
                            translate: 'kể',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'favoirite',
                            translate: 'yêu thích',
                            type: 'trạng từ (Adj)'
                        },
                        {
                            word: 'spell',
                            translate: 'đánh vần',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'live',
                            translate: 'sống',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'distance',
                            translate: 'khoảng cách',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'crowded',
                            translate: 'đông đúc',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'peaceful',
                            translate: 'bình yên',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'beautiful',
                            translate: 'xinh đẹp',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'center',
                            translate: 'trung tâm',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'north',
                            translate: 'phía Bắc',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'address',
                            translate: 'địa chỉ',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'town',
                            translate: 'thị trấn',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'describe',
                            translate: 'miêu tả',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'common',
                            translate: 'phổ biển',
                            type: 'động từ (Adj)'
                        },
                        {
                            word: 'south',
                            translate: 'phía Nam',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'contact',
                            translate: 'liên lạc',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'sign',
                            translate: 'ký',
                            type: 'động từ (Adj)'
                        },
                    ]
                },
                {
                    number: 4,
                    vocabulary: [
                        {
                            word: 'open',
                            translate: 'mở',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'owner',
                            translate: 'người chủ',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'cook',
                            translate: 'người làm bếp',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'acceptable',
                            translate: 'chấp nhận được',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'lawyer',
                            translate: 'luật sư',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'architect',
                            translate: 'kiến trúc sư',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'engineer',
                            translate: 'ký sư',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'manager',
                            translate: 'người quản lý',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'form',
                            translate: 'mẫu đơn',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'assistant',
                            translate: 'trợ lý',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'pilot',
                            translate: 'phi công',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'salesperson',
                            translate: 'người bán hàng',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'housewife',
                            translate: 'bà nội trợ',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'receptionist',
                            translate: 'lế tân',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'hairdresser',
                            translate: 'thợ làm tóc',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'journalist',
                            translate: 'nhà báo',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'accountant',
                            translate: 'kế toán',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'offer',
                            translate: 'đề xuất',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'employer',
                            translate: 'nhà tuyển dụng',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'design',
                            translate: 'thiết kế',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'employee',
                            translate: 'nhân viên',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'company',
                            translate: 'công ty',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'punctual',
                            translate: 'đúng giờ',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'challenging',
                            translate: 'mang tính thách thức',
                            type: 'động từ (Adj)'
                        },
                    ]
                },
                {
                    number: 5,
                    vocabulary: [
                        {
                            word: 'jobless',
                            translate: 'thất nghiệp',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'application',
                            translate: 'đơn xin',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'file',
                            translate: 'cặp đựng tài liệu',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'interview',
                            translate: 'buổi phóng vấn',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'career',
                            translate: 'sự nghiệp',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'secretary',
                            translate: 'thư ký',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'bank teller',
                            translate: 'giao dịch viên ngân hàng',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'filmmaker',
                            translate: 'nhà làm phim',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'musican',
                            translate: 'nhạc sĩ',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'reporter',
                            translate: 'phóng viên',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'photographer',
                            translate: 'nhiếp ảnh gia',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'document',
                            translate: 'tài liệu',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'prepare',
                            translate: 'chuẩn bị',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'arrange',
                            translate: 'sắp xếp',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'qualified',
                            translate: 'đủ khả năng',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'customer',
                            translate: 'khách hàng',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'designer',
                            translate: 'nhà thiết kế',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'tool',
                            translate: 'công cụ',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'expert',
                            translate: 'chuyên gia',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'nurse',
                            translate: 'y tá',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'builder',
                            translate: 'thợ xây',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'employed',
                            translate: 'có việc làm',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'freelancer',
                            translate: 'người hành nghề tự do',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'contract',
                            translate: 'hợp đồng',
                            type: 'danh từ (N)'
                        },
                    ]
                },
            ] 
        },
        {
            name: 'Living',
            units: [
                {
                    number: 6,
                    vocabulary: [
                        {
                            word: 'rich',
                            translate: 'giàu',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'cheap',
                            translate: 'rẻ',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'price',
                            translate: 'giá tiền',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'rent',
                            translate: 'tiền thuê nhà',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'expensive',
                            translate: 'đắt',
                            type: 'tính từ (Adj)'
                        },
                    ]
                },
                {
                    number: 7,
                    vocabulary: [
                        {
                            word: 'capital',
                            translate: 'thủ đô',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'exciting',
                            translate: 'gây hứng thú',
                            type: 'trạng từ (Adj)'
                        },
                        {
                            word: 'skycraper',
                            translate: 'nhà chọc trời',
                            type: 'danh từ (N)'
                        },
                    ]
                },
                {
                    number: 8,
                    vocabulary: []
                },
            ] 
        },
        {
            name: 'Travel',
            units: [
                {
                    number: 11,
                    vocabulary: []
                },
                {
                    number: 12,
                    vocabulary: []
                },
                {
                    number: 13,
                    vocabulary: []
                },
            ] 
        },
    ],
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