export const feedPosts = [
  {
    id: 1,
    user: { name: 'Nisha Kapoor', username: 'nisha.creates', avatar: 'NK', gradient: 'linear-gradient(135deg,#e8c97e,#c96f6f)' },
    image: '🌅',
    imageBg: 'linear-gradient(135deg,#1a1208,#3d2b10)',
    caption: 'Golden hour never gets old. There\'s something about that warm light that just makes everything feel alive. ✨',
    likes: 1842,
    comments: 47,
    time: '2 hours ago',
    tags: ['#photography', '#goldenhour', '#inspira'],
    reach: '14.2k',        // ← Inspira shows reach — Instagram hides this
    saved: false,
    liked: false,
  },
  {
    id: 2,
    user: { name: 'Arjun Lens', username: 'arjun.lens', avatar: 'AL', gradient: 'linear-gradient(135deg,#7eb8e8,#5a7a9e)' },
    image: '🌃',
    imageBg: 'linear-gradient(135deg,#0a1520,#1e3a5f)',
    caption: 'The city never sleeps and neither do I when there\'s light like this 🌃',
    likes: 3291,
    comments: 89,
    time: '5 hours ago',
    tags: ['#nightphotography', '#city', '#urban'],
    reach: '28.5k',
    saved: false,
    liked: false,
  },
  {
    id: 3,
    user: { name: 'Ananya Studio', username: 'ananya.studio', avatar: 'AS', gradient: 'linear-gradient(135deg,#6fcf97,#4a9e6a)' },
    image: '🌿',
    imageBg: 'linear-gradient(135deg,#0f1a0f,#1e3a1e)',
    caption: 'Slow mornings, green views, and a cup of silence 🌿 This is what I create for.',
    likes: 5103,
    comments: 124,
    time: '8 hours ago',
    tags: ['#nature', '#minimal', '#peace'],
    reach: '41.8k',
    saved: false,
    liked: false,
  },
]

export const feedStories = [
  { id: 1, username: 'your story', avatar: '+', gradient: 'linear-gradient(135deg,#2a2a2a,#1a1a1a)', isYours: true },
  { id: 2, username: 'nisha.creates', avatar: 'NK', gradient: 'linear-gradient(135deg,#e8c97e,#c96f6f)', hasNew: true },
  { id: 3, username: 'arjun.lens', avatar: 'AL', gradient: 'linear-gradient(135deg,#7eb8e8,#5a7a9e)', hasNew: true },
  { id: 4, username: 'ananya.studio', avatar: 'AS', gradient: 'linear-gradient(135deg,#6fcf97,#4a9e6a)', hasNew: false },
  { id: 5, username: 'rohan.travels', avatar: 'RT', gradient: 'linear-gradient(135deg,#c96f6f,#8e4a4a)', hasNew: true },
  { id: 6, username: 'maya.art', avatar: 'MA', gradient: 'linear-gradient(135deg,#9b8ede,#6a5acd)', hasNew: false },
]


export const profileData = {
  name: 'Your Name',
  username: 'your.handle',
  avatar: 'You',
  gradient: 'linear-gradient(135deg,#e8c97e,#c96f6f)',
  bio: 'Visual storyteller. Capturing moments that matter. Based in Hyderabad 🇮🇳',
  website: 'inspira.app/@your.handle',
  posts: 48,
  followers: 12400,
  following: 891,
  verified: true,
}

export const profilePosts = [
  { id:1, emoji:'🌅', bg:'linear-gradient(135deg,#1a1208,#3d2b10)', likes:1842, comments:47 },
  { id:2, emoji:'🌃', bg:'linear-gradient(135deg,#0a1520,#1e3a5f)', likes:3291, comments:89 },
  { id:3, emoji:'🌿', bg:'linear-gradient(135deg,#0f1a0f,#1e3a1e)', likes:5103, comments:124 },
  { id:4, emoji:'🌺', bg:'linear-gradient(135deg,#1a0f0f,#3a1e1e)', likes:2847, comments:63 },
  { id:5, emoji:'🏛', bg:'linear-gradient(135deg,#12120a,#2a2a10)', likes:1923, comments:41 },
  { id:6, emoji:'🌌', bg:'linear-gradient(135deg,#0f0f1a,#1e1e3a)', likes:4201, comments:98 },
  { id:7, emoji:'☕', bg:'linear-gradient(135deg,#1a1210,#3a2218)', likes:2156, comments:55 },
  { id:8, emoji:'🌊', bg:'linear-gradient(135deg,#0a1a15,#1e3a30)', likes:3847, comments:77 },
  { id:9, emoji:'🏙', bg:'linear-gradient(135deg,#1a1a12,#3a3a20)', likes:1654, comments:38 },
  { id:10, emoji:'🌸', bg:'linear-gradient(135deg,#1a0f15,#3a1e2a)', likes:2934, comments:71 },
  { id:11, emoji:'🦋', bg:'linear-gradient(135deg,#0f1520,#1e2a3a)', likes:4567, comments:112 },
  { id:12, emoji:'🍃', bg:'linear-gradient(135deg,#0a150f,#1e3a20)', likes:3201, comments:84 },
]

export const notificationsData = [
  // Today
  { id:1, type:'like', user:'nisha.creates', avatar:'NK', gradient:'linear-gradient(135deg,#e8c97e,#c96f6f)', text:'liked your photo', post:'🌅', time:'2m ago', read:false, group:'Today' },
  { id:2, type:'follow', user:'arjun.lens', avatar:'AL', gradient:'linear-gradient(135deg,#7eb8e8,#5a7a9e)', text:'started following you', time:'15m ago', read:false, group:'Today' },
  { id:3, type:'comment', user:'maya.art', avatar:'MA', gradient:'linear-gradient(135deg,#9b8ede,#6a5acd)', text:'commented: "This is absolutely stunning 🔥"', post:'🌃', time:'1h ago', read:false, group:'Today' },
  { id:4, type:'like', user:'rohan.travels', avatar:'RT', gradient:'linear-gradient(135deg,#c96f6f,#8e4a4a)', text:'liked your photo', post:'🌿', time:'2h ago', read:false, group:'Today' },
  { id:5, type:'mention', user:'priya.frames', avatar:'PF', gradient:'linear-gradient(135deg,#e8c97e,#b8945e)', text:'mentioned you in a comment', post:'🏛', time:'3h ago', read:false, group:'Today' },
  { id:6, type:'collab', user:'studio.nine', avatar:'S9', gradient:'linear-gradient(135deg,#6fcf97,#4a9e6a)', text:'invited you to collaborate on a post', time:'4h ago', read:false, group:'Today' },

  // Yesterday
  { id:7, type:'like', user:'ananya.studio', avatar:'AS', gradient:'linear-gradient(135deg,#6fcf97,#4a9e6a)', text:'and 48 others liked your photo', post:'🌌', time:'1d ago', read:true, group:'Yesterday' },
  { id:8, type:'follow', user:'lens.collective', avatar:'LC', gradient:'linear-gradient(135deg,#7eb8e8,#3a5f8e)', text:'started following you', time:'1d ago', read:true, group:'Yesterday' },
  { id:9, type:'save', user:'design.hub', avatar:'DH', gradient:'linear-gradient(135deg,#e8c97e,#c96f6f)', text:'saved your post to their collection', post:'☕', time:'1d ago', read:true, group:'Yesterday', inspira:true },
  { id:10, type:'milestone', user:'inspira', avatar:'✦', gradient:'linear-gradient(135deg,#e8c97e,#f0d88a)', text:'Your post reached 10,000 people! 🎉', time:'1d ago', read:true, group:'Yesterday', inspira:true },

  // This week
  { id:11, type:'comment', user:'urban.frames', avatar:'UF', gradient:'linear-gradient(135deg,#c96f6f,#8e4a4a)', text:'replied to your comment', post:'🌊', time:'3d ago', read:true, group:'This week' },
  { id:12, type:'follow', user:'minimal.co', avatar:'MC', gradient:'linear-gradient(135deg,#888,#555)', text:'started following you', time:'4d ago', read:true, group:'This week' },
  { id:13, type:'milestone', user:'inspira', avatar:'✦', gradient:'linear-gradient(135deg,#e8c97e,#f0d88a)', text:'You gained 100 new followers this week 🚀', time:'5d ago', read:true, group:'This week', inspira:true },
]

export const conversations = [
  {
    id:1, name:'Nisha Kapoor', username:'nisha.creates',
    avatar:'NK', gradient:'linear-gradient(135deg,#e8c97e,#c96f6f)',
    lastMessage:'That golden hour shot was 🔥 How did you edit it?',
    time:'2m', unread:3, online:true, verified:true,
    messages:[
      { id:1, from:'them', text:'Hey! Just saw your latest post 😍', time:'10:21 AM' },
      { id:2, from:'them', text:'That golden hour shot was 🔥 How did you edit it?', time:'10:22 AM' },
      { id:3, from:'me', text:'Thank you so much! I used Lightroom with a custom preset I made', time:'10:25 AM' },
      { id:4, from:'me', text:'Happy to share the preset if you want?', time:'10:25 AM' },
      { id:5, from:'them', text:'Yes please!! That would be amazing 🙏', time:'10:28 AM' },
      { id:6, from:'them', text:'That golden hour shot was 🔥 How did you edit it?', time:'10:30 AM' },
    ]
  },
  {
    id:2, name:'Arjun Lens', username:'arjun.lens',
    avatar:'AL', gradient:'linear-gradient(135deg,#7eb8e8,#5a7a9e)',
    lastMessage:'Are you coming to the photography meetup?',
    time:'1h', unread:1, online:true, verified:false,
    messages:[
      { id:1, from:'them', text:'Hey! Are you coming to the photography meetup this weekend?', time:'9:15 AM' },
      { id:2, from:'me', text:'Which one? The one at Hussain Sagar?', time:'9:45 AM' },
      { id:3, from:'them', text:'Are you coming to the photography meetup?', time:'9:50 AM' },
    ]
  },
  {
    id:3, name:'Maya Art', username:'maya.art',
    avatar:'MA', gradient:'linear-gradient(135deg,#9b8ede,#6a5acd)',
    lastMessage:'I loved your architecture series!',
    time:'3h', unread:0, online:false, verified:true,
    messages:[
      { id:1, from:'them', text:'I loved your architecture series!', time:'Yesterday' },
      { id:2, from:'me', text:'Thank you Maya! Your paintings inspired me actually', time:'Yesterday' },
    ]
  },
  {
    id:4, name:'Studio Nine', username:'studio.nine',
    avatar:'S9', gradient:'linear-gradient(135deg,#6fcf97,#4a9e6a)',
    lastMessage:'Collab request: Urban Nights series 🌃',
    time:'1d', unread:0, online:false, verified:true,
    messages:[
      { id:1, from:'them', text:'Hi! We would love to collaborate on an Urban Nights series with you', time:'Yesterday' },
      { id:2, from:'them', text:'Collab request: Urban Nights series 🌃', time:'Yesterday' },
    ]
  },
  {
    id:5, name:'Rohan Travels', username:'rohan.travels',
    avatar:'RT', gradient:'linear-gradient(135deg,#c96f6f,#8e4a4a)',
    lastMessage:'Sent a photo',
    time:'2d', unread:0, online:false, verified:false,
    messages:[
      { id:1, from:'them', text:'Check out this spot I found in Coorg!', time:'2 days ago' },
      { id:2, from:'them', text:'Sent a photo', time:'2 days ago' },
    ]
  },
  {
    id:6, name:'Priya Frames', username:'priya.frames',
    avatar:'PF', gradient:'linear-gradient(135deg,#e8c97e,#b8945e)',
    lastMessage:'Thanks for the feedback on my reel ✨',
    time:'3d', unread:0, online:true, verified:true,
    messages:[
      { id:1, from:'me', text:'Your reel was incredible! The transitions were so smooth', time:'3 days ago' },
      { id:2, from:'them', text:'Thanks for the feedback on my reel ✨', time:'3 days ago' },
    ]
  },
]

export const reelsData = [
  {
    id:1,
    user:{ name:'Nisha Kapoor', username:'nisha.creates', avatar:'NK', gradient:'linear-gradient(135deg,#e8c97e,#c96f6f)', verified:true },
    emoji:'🌅', bg:'linear-gradient(135deg,#1a1208,#3d2b10,#1a0a05)',
    caption:'Golden hour in Hyderabad hits different every single time ✨ #goldenhour #photography',
    audio:'Original audio · nisha.creates',
    likes:48200, comments:892, shares:1240, saves:3891,
    reach:'284k', duration:'0:28',
    whyShowing:'You saved similar posts', // Inspira exclusive
    tags:['#goldenhour','#photography','#hyderabad'],
  },
  {
    id:2,
    user:{ name:'Arjun Lens', username:'arjun.lens', avatar:'AL', gradient:'linear-gradient(135deg,#7eb8e8,#5a7a9e)', verified:false },
    emoji:'🌃', bg:'linear-gradient(135deg,#0a1520,#1e3a5f,#0a0a20)',
    caption:'The city never sleeps and neither do I when there\'s light like this 🌃 Shot on mirrorless',
    audio:'Midnight City — M83',
    likes:92100, comments:2341, shares:4820, saves:8920,
    reach:'891k', duration:'0:45',
    whyShowing:'Trending in Photography',
    tags:['#nightphotography','#city','#urban'],
  },
  {
    id:3,
    user:{ name:'Ananya Studio', username:'ananya.studio', avatar:'AS', gradient:'linear-gradient(135deg,#6fcf97,#4a9e6a)', verified:true },
    emoji:'🌿', bg:'linear-gradient(135deg,#0f1a0f,#1e3a1e,#0a1a0a)',
    caption:'Slow mornings are the secret to great work 🌿 My morning routine as a creator',
    audio:'Lo-fi Chill Beats · various',
    likes:31400, comments:541, shares:892, saves:5201,
    reach:'156k', duration:'1:02',
    whyShowing:'Followed by people you follow',
    tags:['#morning','#creator','#slowliving'],
  },
  {
    id:4,
    user:{ name:'Maya Art', username:'maya.art', avatar:'MA', gradient:'linear-gradient(135deg,#9b8ede,#6a5acd)', verified:true },
    emoji:'🎨', bg:'linear-gradient(135deg,#1a0f2a,#2a1a4a,#1a0f2a)',
    caption:'Watch me paint this from scratch in 60 seconds 🎨 Full process on my page',
    audio:'Original audio · maya.art',
    likes:124000, comments:3891, shares:9240, saves:18200,
    reach:'1.2M', duration:'0:58',
    whyShowing:'You liked similar content',
    tags:['#art','#painting','#timelapse'],
  },
]

export const exploreCategories = [
  { id:'all', label:'All', icon:'✦' },
  { id:'photography', label:'Photography', icon:'📸' },
  { id:'travel', label:'Travel', icon:'✈️' },
  { id:'architecture', label:'Architecture', icon:'🏛' },
  { id:'nature', label:'Nature', icon:'🌿' },
  { id:'food', label:'Food', icon:'☕' },
  { id:'art', label:'Art', icon:'🎨' },
  { id:'fashion', label:'Fashion', icon:'✨' },
  { id:'music', label:'Music', icon:'🎵' },
]

export const explorePosts = [
  { id:1, emoji:'🌅', bg:'linear-gradient(135deg,#1a1208,#3d2b10)', likes:4820, comments:92, user:'nisha.creates', size:'large', category:'photography' },
  { id:2, emoji:'🌃', bg:'linear-gradient(135deg,#0a1520,#1e3a5f)', likes:9210, comments:234, user:'arjun.lens', size:'small', category:'photography' },
  { id:3, emoji:'🌿', bg:'linear-gradient(135deg,#0f1a0f,#1e3a1e)', likes:3140, comments:54, user:'ananya.studio', size:'small', category:'nature' },
  { id:4, emoji:'🏛', bg:'linear-gradient(135deg,#12120a,#2a2a10)', likes:6720, comments:143, user:'urban.frames', size:'small', category:'architecture' },
  { id:5, emoji:'🎨', bg:'linear-gradient(135deg,#1a0f2a,#2a1a4a)', likes:12400, comments:389, user:'maya.art', size:'large', category:'art' },
  { id:6, emoji:'✈️', bg:'linear-gradient(135deg,#0a1520,#1e3a5f)', likes:8930, comments:201, user:'rohan.travels', size:'small', category:'travel' },
  { id:7, emoji:'☕', bg:'linear-gradient(135deg,#1a1210,#3a2218)', likes:2840, comments:67, user:'cafe.moments', size:'small', category:'food' },
  { id:8, emoji:'🌌', bg:'linear-gradient(135deg,#0f0f1a,#1e1e3a)', likes:15600, comments:421, user:'cosmos.lens', size:'large', category:'photography' },
  { id:9, emoji:'🌺', bg:'linear-gradient(135deg,#1a0f0f,#3a1e1e)', likes:5210, comments:98, user:'flora.studio', size:'small', category:'nature' },
  { id:10, emoji:'🏙', bg:'linear-gradient(135deg,#1a1a12,#3a3a20)', likes:7840, comments:167, user:'city.frames', size:'small', category:'architecture' },
  { id:11, emoji:'🌊', bg:'linear-gradient(135deg,#0a1a15,#1e3a30)', likes:9320, comments:248, user:'ocean.eye', size:'small', category:'nature' },
  { id:12, emoji:'🎵', bg:'linear-gradient(135deg,#1a0f2a,#3a1a4a)', likes:4560, comments:112, user:'sound.visual', size:'large', category:'music' },
  { id:13, emoji:'🌸', bg:'linear-gradient(135deg,#1a0f15,#3a1e2a)', likes:6780, comments:189, user:'bloom.studio', size:'small', category:'nature' },
  { id:14, emoji:'✨', bg:'linear-gradient(135deg,#1a1a0f,#3a3a1e)', likes:11200, comments:334, user:'style.collective', size:'small', category:'fashion' },
  { id:15, emoji:'🦋', bg:'linear-gradient(135deg,#0f1520,#1e2a3a)', likes:8940, comments:276, user:'nature.lens', size:'small', category:'nature' },
]

export const trendingTopics = [
  { tag:'#goldenhour', posts:'48.2k', growth:'+12%' },
  { tag:'#urbanminimal', posts:'23.1k', growth:'+28%' },
  { tag:'#slowliving', posts:'19.4k', growth:'+8%' },
  { tag:'#architecturephotography', posts:'34.7k', growth:'+15%' },
  { tag:'#analogfilm', posts:'12.9k', growth:'+41%' },
]

export const suggestedCreators = [
  { name:'Cosmos Lens', username:'cosmos.lens', avatar:'CL', gradient:'linear-gradient(135deg,#0f0f1a,#1e1e3a)', followers:'124k', category:'Astrophotography' },
  { name:'Flora Studio', username:'flora.studio', avatar:'FS', gradient:'linear-gradient(135deg,#1a0f0f,#3a1e1e)', followers:'89k', category:'Nature & Botanicals' },
  { name:'Urban Frames', username:'urban.frames', avatar:'UF', gradient:'linear-gradient(135deg,#12120a,#2a2a10)', followers:'67k', category:'Architecture' },
]