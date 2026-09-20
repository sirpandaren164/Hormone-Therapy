const COURSE_PREFIX = 'm1_m8_m8l5_integrated_v1';
const VISITED_KEY = COURSE_PREFIX + '_visited';
const PROFILE_KEY = COURSE_PREFIX + '_profile';
const EXAM_KEY = COURSE_PREFIX + '_final_exam';
const CERT_KEY = COURSE_PREFIX + '_certificate';
const TOTAL_SCREENS = 331;
const LESSON_COUNTS = {"1": 8, "2": 13, "3": 9, "4": 9, "5": 9, "6": 6, "7": 7, "8": 8, "9": 8, "10": 8, "11": 8, "12": 4, "13": 4, "14": 4, "15": 4, "16": 4, "17": 4, "18": 6, "19": 6, "20": 6, "21": 6, "22": 6, "23": 4, "24": 6, "25": 6, "26": 6, "27": 6, "28": 6, "29": 4, "30": 6, "31": 6, "32": 6, "33": 6, "34": 6, "35": 5, "36": 6, "37": 6, "38": 6, "39": 5, "40": 6, "41": 6, "42": 4, "43": 8, "44": 7, "45": 5, "46": 6, "47": 7, "48": 4, "49": 7, "50": 8, "51": 5, "52": 5, "53": 5, "54": 5};
const MODULE_LESSONS = {"1": ["1", "2", "3", "4", "5", "6", "7", "8", "9"], "2": ["10", "11", "12", "13", "14", "15", "16", "17"], "3": ["18", "19", "20", "21", "22", "23"], "4": ["24", "25", "26", "27", "28", "29"], "5": ["30", "31", "32", "33", "34", "35"], "6": ["36", "37", "38", "39", "40", "41"], "7": ["42", "43", "44", "45", "46", "47", "48", "49"], "8": ["50", "51", "52", "53", "54"]};
const MODULE_COUNTS = {"1": 77, "2": 40, "3": 34, "4": 34, "5": 35, "6": 35, "7": 48, "8": 28};
const MODULE_INFO = {
  '1':{title:'Hormone Fundamentals',desc:'พื้นฐานฮอร์โมน ไทรอยด์ Testosterone, Estrogen, Adrenal hormones, Melatonin และ GH–IGF-1'},
  '2':{title:'Female Hormone Therapy',desc:'การประเมิน การตรวจ และแนวทางดูแล Estrogen/Progesterone ก่อนและหลัง menopause'},
  '3':{title:'Growth Hormone in Adults',desc:'GH deficiency, IGF-1, diagnosis, body composition, administration และ monitoring'},
  '4':{title:'Coronary Heart Disease & Hormones',desc:'CHD risk assessment และบทเรียนเรื่อง Thyroid, Testosterone, Estrogen, GH/IGF-1 กับหัวใจ'},
  '5':{title:'Testosterone Therapy in Men',desc:'ภาวะพร่อง การวินิจฉัย Lab evaluation และ treatment routes รวม pellets'},
  '6':{title:'Skin & Hormones',desc:'Hormonal skin signs, Thyroid, GH/IGF-1, Melatonin, DHEA และ facial aging'},
  '7':{title:'Slimming Hormone Treatments',desc:'Thyroid, GH/IGF-1, Testosterone, Estrogen balance และ body-composition patterns'},
  '8':{title:'Healthy and Happy Weight Reduction',desc:'Energy balance, nutrition, physical activity, sleep/stress, behavior change และ long-term maintenance'}
};
function safeJSON(key, fallback){try{const v=JSON.parse(localStorage.getItem(key));return v ?? fallback;}catch(e){return fallback;}}
function saveJSON(key,val){localStorage.setItem(key,JSON.stringify(val));}
function bootstrapLegacyProgress(){
  let v = new Set(safeJSON(VISITED_KEY, []));
  Object.entries(LESSON_COUNTS).forEach(([id,count])=>{
    const s=localStorage.getItem(COURSE_PREFIX+'_l'+id+'_page');
    if(s!==null){ const last=Math.min(parseInt(s,10)||0,count-1); for(let i=0;i<=last;i++)v.add(id+':'+i); }
  });
  saveJSON(VISITED_KEY,[...v]); return v;
}
function getVisited(){return bootstrapLegacyProgress();}
function totalProgress(){return Math.round(getVisited().size/TOTAL_SCREENS*100);}
function moduleProgress(m){const v=getVisited();let done=0;MODULE_LESSONS[m].forEach(id=>{for(let i=0;i<LESSON_COUNTS[id];i++)if(v.has(id+':'+i))done++;});return Math.round(done/MODULE_COUNTS[m]*100);}
function courseComplete(){return getVisited().size>=TOTAL_SCREENS;}
function getProfile(){return safeJSON(PROFILE_KEY,{name:'',organization:'',email:''});}
function saveProfile(p){saveJSON(PROFILE_KEY,p);}
function getExam(){return safeJSON(EXAM_KEY,{attempts:0,bestScore:0,passed:false,lastScore:0,passedAt:null});}
function getCert(){return safeJSON(CERT_KEY,null);}
function esc(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function fmtDate(iso){if(!iso)return '-';try{return new Intl.DateTimeFormat('th-TH',{dateStyle:'long'}).format(new Date(iso));}catch(e){return iso;}}
function currentBase(){const u=new URL(location.href);u.pathname=u.pathname.replace(/[^/]*$/,'');u.search='';u.hash='';return u.toString();}
