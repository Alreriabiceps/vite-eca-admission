import { Link, useParams } from "react-router-dom";

const NEWS = {
  "feature-gg-well-code": {
    title:
      "FEATURE | Team GG Well Code Reaches Top 5 at the Byte Forward Hackathon Final Pitch",
    image: "/news/q.jpg",
    body: `𝐅𝐄𝐀𝐓𝐔𝐑𝐄 | 𝗧𝗲𝗮𝗺 𝗚𝗚 𝗪𝗲𝗹𝗹 𝗖𝗼𝗱𝗲 𝗥𝗲𝗮𝗰𝗵𝗲𝘀 𝗧𝗼𝗽 𝟱 𝗮𝘁 𝘁𝗵𝗲 𝗕𝘆𝘁𝗲 𝗙𝗼𝗿𝘄𝗮𝗿𝗱 𝗛𝗮𝗰𝗸𝗮𝘁𝗵𝗼𝗻 𝗙𝗶𝗻𝗮𝗹 𝗣𝗶𝘁𝗰𝗵

Last October 21, 2025 at SMX Convention Center, Pasay City. Team GG Well Code, consisting of four innovative students from EXACT Colleges of Asia — Ysa Victorio, Trixie Mae Pantalunan, Russelle Roxas, and Ivan Mark Maglaqui proudly represented their school at the Byte Forward Hackathon Final Pitch.

The team presented their project with the theme of “Smart Marketing and Business Finder Tool". The Byte Forward Hackathon was organized in partnership with PCCI, Rev 21 Labs Inc., and Converge. They gathered some of the most promising young developers and innovators across the country. The event aimed to inspire students to create impactful digital solutions that drive innovation and progress within local communities. Throughout the competition, participants demonstrated creativity, collaboration, and problem-solving skills in addressing relevant social and business issues.

The hackathon held five regional legs across the country and engaged over 200 student participants from 38 schools and universities. A total of 50 problem statements were presented throughout the event, and 15 outstanding teams advanced to the national leg for their final pitch.

From 15 finalists, Team GG Well Code successfully secured a spot in the Top 5, a remarkable achievement that reflects their dedication, teamwork, and passion for using technology. As the event ended, the team expressed their gratitude for the opportunity to represent their school and showcase their innovation on a national stage.

The success of Team GG Well Code was marked as their unforgettable milestone and underscores the growing potential of young Filipino innovators in developing digital solutions that respond to modern challenges and opportunities.`,
  },
  "haunted-treasure-hunt": {
    title: "HAUNTED TREASURE HUNT | Adventure Awaits",
    image: "/news/w.jpg",
    body: `𝐇𝐀𝐔𝐍𝐓𝐄𝐃 𝐓𝐑𝐄𝐀𝐒𝐔𝐑𝐄 𝐇𝐔𝐍𝐓 | 𝐀𝐝𝐯𝐞𝐧𝐭𝐮𝐫𝐞 𝐀𝐰𝐚𝐢𝐭𝐬
Get ready for a night of thrill and mystery as the Supreme Student Council presents the 𝐇𝐚𝐮𝐧𝐭𝐞𝐝 𝐓𝐫𝐞𝐚𝐬𝐮𝐫𝐞 𝐇𝐮𝐧𝐭, happening on 𝐎𝐜𝐭𝐨𝐛𝐞𝐫 𝟑𝟎, 𝟐𝟎𝟐𝟓 (𝐓𝐡𝐮𝐫𝐬𝐝𝐚𝐲), 𝟓:𝟎𝟎 𝐏𝐌 𝐚𝐭 𝐭𝐡𝐞 𝐐𝐮𝐚𝐝𝐫𝐚𝐧𝐠𝐥𝐞.
Experience a one-of-a-kind Halloween adventure filled with challenges, teamwork, and hidden treasures waiting to be discovered. This event aims to promote camaraderie, critical thinking, and school spirit in an exciting and unforgettable way.
Adding more excitement to the evening, there will also be a 𝐁𝐚𝐭𝐭𝐥𝐞 𝐨𝐟 𝐭𝐡𝐞 𝐁𝐚𝐧𝐝𝐬! Interested groups who wish to showcase their musical talent are encouraged to join. Stay tuned  a separate post will be made for more details about this segment of the event.
𝐓𝐡𝐞𝐦𝐞: Treasure Hunt. Wear Comfortable Halloween Costume.
𝐒𝐥𝐨𝐭𝐬 𝐀𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞: 𝟓𝟎𝟎𝐩𝐜𝐬 𝐨𝐧𝐥𝐲
𝐓𝐢𝐜𝐤𝐞𝐭 𝐏𝐫𝐢𝐜𝐞: 𝐍𝐎 𝐄𝐍𝐓𝐑𝐀𝐍𝐂𝐄 𝐅𝐄𝐄
𝐓𝐢𝐜𝐤𝐞𝐭𝐬 𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐚𝐭: Office of Student Affairs (OSA), Dr. Marcos Building, Room 102
𝐑𝐞𝐦𝐢𝐧𝐝𝐞𝐫𝐬: No ID, No Ticket. Strictly no reservations.
𝐓𝐢𝐜𝐤𝐞𝐭 𝐝𝐢𝐬𝐭𝐫𝐢𝐛𝐮𝐭𝐢𝐨𝐧 𝐰𝐢𝐥𝐥 𝐬𝐭𝐚𝐫𝐭 𝐭𝐨𝐝𝐚𝐲, 𝟏:𝟎𝟎 𝐏𝐌 𝐭𝐨 𝟓:𝟎𝟎 𝐏𝐌. 𝐎𝐧𝐥𝐲 𝟏𝟎𝟎 𝐭𝐢𝐜𝐤𝐞𝐭𝐬 𝐰𝐢𝐥𝐥 𝐛𝐞 𝐫𝐞𝐥𝐞𝐚𝐬𝐞𝐝 𝐩𝐞𝐫 𝐝𝐚𝐲.
Gather your courage, join the hunt, and uncover the secrets that await.
𝐒𝐞𝐞 𝐲𝐨𝐮 𝐭𝐡𝐞𝐫𝐞, 𝐄𝐂𝐀 𝐬𝐭𝐮𝐝𝐞𝐧𝐭𝐬!
#ECAHalloween #HauntedTreasureHunt #BattleOfTheBands #ECAEvents`,
  },
  "battle-of-the-bands-2025": {
    title: "BATTLE OF THE BANDS 2025 – GUIDELINES AND MECHANICS",
    image: "/news/e.jpg",
    body: `  𝐁𝐀𝐓𝐓𝐋𝐄 𝐎𝐅 𝐓𝐇𝐄 𝐁𝐀𝐍𝐃𝐒 𝟐𝟎𝟐𝟓 – 𝐆𝐔𝐈𝐃𝐄𝐋𝐈𝐍𝐄𝐒 𝐀𝐍𝐃 𝐌𝐄𝐂𝐇𝐀𝐍𝐈𝐂𝐒
The 𝐁𝐚𝐭𝐭𝐥𝐞 𝐨𝐟 𝐭𝐡𝐞 𝐁𝐚𝐧𝐝𝐬 aims to showcase the musical talents of students, promote creativity and teamwork, and foster appreciation for music and live performance.
   𝐄𝐋𝐈𝐆𝐈𝐁𝐈𝐋𝐈𝐓𝐘
• The competition is open to all bona fide students of EXACT Colleges of Asia.
• Each band must have 3 to 8 members, including vocalists and instrumentalists.
• A member may only perform in one band.
• Each band must register within the official registration period and submit the required forms.
   𝐏𝐄𝐑𝐅𝐎𝐑𝐌𝐀𝐍𝐂𝐄 𝐆𝐔𝐈𝐃𝐄𝐋𝐈𝐍𝐄𝐒
• Each band will be allotted a maximum of 15 minutes for setup, performance, and exit.
• Bands may perform 2 songs only.
• Lyrics and performances must be free of obscene, profane, or offensive content.
• All instruments and equipment must be handled responsibly.
• Bands must arrive at least one hour before the competition starts for sound check and briefing.
   𝐓𝐄𝐂𝐇𝐍𝐈𝐂𝐀𝐋 𝐆𝐔𝐈𝐃𝐄𝐋𝐈𝐍𝐄𝐒
• Basic sound system, amplifiers, drum set, and microphones will be provided by the organizers:
o 1 guitar amp
o 1 keyboard amp
o 1 bass amp
o Drum set
• Bands must bring their own instruments (e.g., guitars, bass, keyboards, drumsticks).
• Any special equipment needed must be coordinated with the technical team in advance.
🏅 𝐀𝐖𝐀𝐑𝐃𝐒
• 🏆 Champion
• 🥈 1st Runner-Up
• 🥉 2nd Runner-Up
• 🎖️ Best Vocalist / Best Guitarist / Best Drummer / Crowd Favorite`,
  },
};

const NewsPost = () => {
  const { slug } = useParams();
  const post = NEWS[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-2xl font-bold text-[#0D1B2A] mb-4">
              News Not Found
            </h1>
            <Link to="/" className="text-[#1B9AAA] font-semibold">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto object-contain"
          />
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0D1B2A] mb-4">
              {post.title}
            </h1>
            <div className="text-[#343A40] whitespace-pre-line text-sm sm:text-base">
              {post.body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPost;
