const log=console.log;
const logt=console.table;
const tm=``

const PLAYER_STORAGE_KEY='HYUTA_PLAYER';

let player=document.querySelector('.player');
let playList=document.querySelector('.playlist');
let header=document.querySelector('.header');
let cd=document.querySelector('.cd')
let cdThumb=document.querySelector('.cd-thumb');
let audioSong=document.querySelector('audio')

let progressbar=document.querySelector('.progress');
let btn_Play=document.querySelector('.btn-toggle-play');
let btn_Next=document.querySelector('.btn-next');
let btn_Pre=document.querySelector(".btn-prev")
let btn_Repeat=document.querySelector('.btn-repeat')
let btn_Random=document.querySelector('.btn-random')


const app={
    
    getcdThumbAnimate:function(){
        let cdThumb=document.querySelector('.cd-thumb');
        return cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity
        })
    },
    settings:JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY))||{},
    lastIndex:0,
    currentIndex:0,
    isRandom:false,
    isRepeat:false,
    setSetting:function(key,value){
        this.settings[key]=value;
        localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.settings));
    },
    song:[
        {
            id:1,
            name:'Ánh Trăng Buồn',
            singer: 'Thành Đạt, Mixus',
            path:'/Music Player/Music/AnhTrangBuonLofiCover-ThanhDatMixus-12399519.mp3',
            image:'/Music Player/Img/1699867348489_500.jpg'
        },
        {
            id:2,
            name:'Cố Giang Tình',
            singer: 'Hương Ly',
            path:'/Music Player/Music/CoGiangTinhRemix-HuongLy-6316505.mp3',
            image:'/Music Player/Img/1675925047627_500.jpg'
        },
        {
            id:3,
            name:'Cứu Vãn Kịp Không',
            singer: 'Vương Anh Tú',
            path:'/Music Player/Music/CuuVanKipKhong-VuongAnhTu-7847996.mp3',
            image:'/Music Player/Img/1662537457511_500.jpg'
        },
        {
            id:4,
            name:'Dáng Em',
            singer: 'Dương Edward',
            path:'/Music Player/Music/DangEmLofiVersion-DuongEdward-7093196.mp3',
            image:'/Music Player/Img/1679900698123_500.jpg'
        },
        {
            id:5,
            name:'Kiếp Má Hồng',
            singer: 'TLong, Lạc Khởi',
            path:'/Music Player/Music/KiepMaHong-TLongLacKhoi-7205562.mp3',
            image:'/Music Player/Img/1652069404851_500.jpg'
        },
        {
            id:6,
            name:'Khuê Mộc Lang',
            singer: 'Jombie, Hương Ly',
            path:'/Music Player/Music/KhueMocLang-JombieHuongLy-7073372.mp3',
            image:'/Music Player/Img/1629606274861_500.jpg'
        },
        {
            id:7,
            name:'Người Tình Mùa Đông',
            singer: 'Đức Phúc, Mono',
            path:'/Music Player/Music/NguoiTinhMuaDong-DucPhucMONODTAP-8343704.mp3',
            image:'/Music Player/Img/1669712534560_500.jpg'
        },
        {
            id:8,
            name:'Rượu Mừng Hóa Người Dưng',
            singer: 'TLong, ACV, Roller',
            path:'/Music Player/Music/RuouMungHoaNguoiDungLofiVersion-TLongACVRoller-9830918.mp3',
            image:'/Music Player/Img/1688196669077_500.jpg'
        },
        {
            id:9,
            name:'Thuyền Quyên',
            singer: 'Diệu Kiên, Cao Tri',
            path:'/Music Player/Music/ThuyenQuyenLofiVer-DieuKienCaoTri-8520916.mp3',
            image:'/Music Player/Img/1673239503736_500.jpg'
        },
        {
            id:10,
            name:'Until You',
            singer: 'Shayne Ward',
            path:'/Music Player/Music/Until You - Shayne Ward (NhacPro.net).mp3',
            image:'/Music Player/Img/1517189710456_500.jpg'
        },
        {
            id:11,
            name:'Why Not Me',
            singer: 'Enrique Iglesias',
            path:'/Music Player/Music/Why Not Me - Enrique Iglesias (NhacPro.net).mp3',
            image:'/Music Player/Img/1672900432639_500.jpg'
        }
    ],

    loadSong(currentIndex){
        //Tải bài nhạc
        let headerItem=  `   <h4>Now playing:</h4>
                            <h2>${this.song[currentIndex].name}</h2>  
                        `
        let cdItem=` <div class="cd-thumb" style="background-image: url('${this.song[currentIndex].image}')">
        </div>`
        audioSong.src=this.song[currentIndex].path
        header.innerHTML=headerItem;
        cd.innerHTML=cdItem   
        
        //Active bài nhạc đã tải trong danh sach
        app.currentIndex=currentIndex;
        document.querySelector(`.song-${this.song[this.lastIndex].id}`).classList.remove('active');
        document.querySelector(`.song-${this.song[currentIndex].id}`).classList.add('active');
        app.lastIndex=currentIndex;
    },

    handlEvents(){
        const cdWidth=cd.offsetWidth;

        // Sự kiện thumb xoay tròn
        var cdThumbAnimate=app.getcdThumbAnimate();
        cdThumbAnimate.pause()


        //Xử lý sự kiện phóng to thu nhỏ
        document.onscroll=()=>{
            let scrollPosition=window.scrollY || document.documentElement.scrollTop;
            let newWidth=cdWidth-scrollPosition;
            
            cd.style.width=(newWidth>0?newWidth+'px':0);
            cd.style.opacity=newWidth/cdWidth
        }

        //Sự kiện nhấn nút play để chạy nhạc 
        btn_Play.addEventListener('click',()=>{
            if(audioSong.paused) {
                audioSong.play();
            }
            else{
                audioSong.pause();
            }
        })
        audioSong.onplay=(e)=>{
            player.classList.add('playing')
            cdThumbAnimate.play();
        }
        audioSong.onpause=(e)=>{
            player.classList.remove('playing')
            cdThumbAnimate.pause();
        }

        //Sự kiện khi tua nhạc
        progressbar.oninput=(e)=>{
            audioSong.currentTime=e.target.value/100 * audioSong.duration;
        }

        //Sự kiện khi nhạc chạy 
        audioSong.ontimeupdate=(e)=>{
            if(audioSong.currentTime===0){
                progressbar.value=0;
            }
            else{
                progressbar.value=Math.floor(audioSong.currentTime/audioSong.duration *100);
            }
        }
        //Sự kiện khi nhạc kết thúc
        audioSong.onended=()=>{
            if(btn_Repeat.classList.contains('active')){
                app.resetSong();
            }
            else{
                app.clickNext();
            }
        }
        //Sự kiện khi nhấn nút Next
        btn_Next.addEventListener('click',(e)=>{
            cdThumbAnimate=app.clickNext(cdThumbAnimate);
        })

        //Sự kiện khi nhấn nút Previous
        btn_Pre.addEventListener('click',(e)=>{
            cdThumbAnimate=app.clickPre(cdThumbAnimate);
        })
        //Sự kiện khi nhấn nút Repeat
        btn_Repeat.addEventListener('click',(e)=>{
            btn_Repeat.classList.toggle('active');
            if(btn_Repeat.classList.contains('active')){
                app.isRepeat=true;
            }
            else{
                app.isRepeat=false;
            }
            app.setSetting('isRepeat',app.isRepeat);
        })
        //Sự kiện khi nhấn nút Random
        btn_Random.addEventListener('click',(e)=>{
            btn_Random.classList.toggle('active');
             if(btn_Random.classList.contains('active')){
                app.isRandom=true;
            }
            else{
                app.isRandom=false;
            }
            app.setSetting('isRandom',app.isRandom);
        })       
        
        //Sự kiện click vào bài nhạc
        playList.addEventListener('click',(e)=>{
            const songNode=e.target.closest('.song:not(.active)');
            if(songNode||e.target.closest('.option')){
                if(songNode){
                    progressbar.value=0;
                    this.loadSong(songNode.classList[1].split('-')[1]-1);
                    app.setSetting('song',songNode.classList[1].split('-')[1]-1)
                    cdThumbAnimate=app.getcdThumbAnimate();
                    cdThumbAnimate.pause();
                    audioSong.play();
                    app.scrollToActiveSong();
                }
                else{
                    log('Option')
                }
            }
        })

    },

    //Sự kiện khi nhấn nút Next
    clickNext:function(cdThumbAnimate){
        progressbar.value=0;
        if(btn_Random.classList.contains('active')){
            do{
                var random=Math.floor(Math.random()*(app.song.length-1));
            }while(random===app.currentIndex)
            app.loadSong(random);
            app.setSetting('song',random)
        }
        else{
            app.loadSong((app.currentIndex===app.song.length-1)?0:++this.currentIndex);
            app.setSetting('song',app.currentIndex);
        }
        cdThumbAnimate=app.getcdThumbAnimate();
        audioSong.play();
        app.scrollToActiveSong();
        return cdThumbAnimate;
    },

    //Sự kiện khi nhấn nút Previous
    clickPre:function(cdThumbAnimate){
        progressbar.value=0;
        if(btn_Random.classList.contains('active')){
            do{
                var random=Math.floor(Math.random()*(app.song.length-1));
            }while(random===app.currentIndex)
            app.loadSong(random);
            app.setSetting('song',random)
        }
        else{
            this.loadSong((app.currentIndex===0)?app.song.length-1:--this.currentIndex);
            app.setSetting('song',app.currentIndex);
        }
        cdThumbAnimate=app.getcdThumbAnimate();
        audioSong.play();
        app.scrollToActiveSong();
        return cdThumbAnimate;
    },

    
    resetSong:function(){
        //Sự kiện reload lại nhạc
        progressbar.value=0;
        audioSong.currentTime=0;
        audioSong.play();
    },
    scrollToActiveSong: function(){
        setTimeout(()=>{
            document.querySelector(`.song-${app.song[app.currentIndex].id}`).scrollIntoView({
                behavior:'smooth',
                block:'center',
            });
        },50)
    },
    
    render(){
        // Tải danh sách nhạc lên playlist
        let htmls=app.song.map((song,index)=>{
            return  `<div class="song song-${song.id}">
                        <div class="thumb" style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>` 
        })
        playList.innerHTML=htmls.join('');
    },
    loadSetting(){
        btn_Random.classList.toggle('active', this.settings.isRandom);
        btn_Repeat.classList.toggle('active',this.settings.isRepeat);
    },

    start(){
        //Tải setting người dùng ban đầu
        this.loadSetting();

        //Tải danh sách nhạc lên playlist
        this.render()
        
        //Tải bài nhạc đầu tiên lên 
        this.loadSong(this.settings.song);

        //Xử lý các sự kiện
        this.handlEvents()

    }
}
app.start();
