import { BehaviorResult } from "../types";

export const PREDEFINED_BEHAVIORS: BehaviorResult[] = [
  {
    id: "ocd-hands",
    query: "cleans hands constantly",
    clinicalConcept: "Obsessive-Compulsive Disorder (OCD)",
    shortExplanation: "This is a common sign of Obsessive-Compulsive Disorder (OCD). The constant hand-washing is an action to lower a strong, nagging fear of germs, dirt, or getting sick.",
    outsideAction: "What people see: Washing hands up to 50 times a day, avoiding dirty things like door handles, and having red, dry, or cracked skin.",
    insideMind: "What they actually feel: A constant worry that germs are on their skin and will spread to loved ones. They feel that if they stop washing, they are directly putting people in danger.",
    matchMeter: [
      { disorder: "Obsessive-Compulsive Disorder (OCD)", percentage: 95 },
      { disorder: "Generalized Anxiety Disorder (GAD)", percentage: 50 },
      { disorder: "Specific Phobia (Mysophobia)", percentage: 40 }
    ],
    triOrigin: {
      body: "The brain's safety alarms get stuck in a repeating loop. It can also run in families and relates to chemical signals in the brain.",
      mind: "Feeling over-responsible for everyone's safety and believing that thinking about a bad event makes it more likely to happen.",
      world: "Growing up in a home that demands perfection, learning anxious habits from family, or facing stressful changes."
    },
    audioVisualMock: {
      title: "Audio Log Case #102: Contamination",
      duration: "1:48",
      description: "Anonymized clinic session detailing the cycle of contamination fear and skin relief.",
      narrator: "Dr. Catherine Voss, Clinical Lead",
      transcript: "The student washes hands for hours every day. This repetitive washing helps silence a loud inner fear for a brief moment. Unfortunately, the dry, cracked skin on their hands makes them worry even more about catching something."
    },
    childhoodEnvironment: "Raised in a household with highly demanding or protective rules, where there was severe pressure to avoid dirt, mess, errors, or any forms of failure.",
    childhoodCauses: "Learning early that bad occurrences are their personal responsibility to prevent, turning natural safety checks into locked mental protection loops.",
    searchSentences: [
      "I have to wash my hands over and over because of germs.",
      "I feel like if I don't clean everything carefully, my family is going to get sick.",
      "My mind gets stuck repeating cleaning routines and checking stove switches constantly.",
      "I keep thinking everything is dirty and contaminated, and I can't stop scrubbing."
    ],
    tags: ["hands", "clean", "wash", "soap", "germs", "contam", "ocd", "checking", "locking", "routines"],
    analogy: "Think of OCD like a faulty home security system with a broken alarm that screams 'danger!' at the tiniest gust of wind. You know there is no burglar, but the siren is so incredibly loud and distressing that you feel forced to wash your hands or check the locks over and over just to get a brief moment of quiet.",
    conversationScenario: {
      context: "A flatmate asks them to grab a quick snack, but they are stuck checking the kitchen sink faucet.",
      dialogue: [
        {
          speaker: "Flatmate",
          speech: "Hey, are you coming? The convenience store down the street closes in ten minutes.",
          innerThought: "They look so stressed, and they've been standing at that sink for almost five minutes."
        },
        {
          speaker: "Person",
          speech: "Yes, I'm almost ready. I just need to make sure the kitchen tap is completely closed and dry. Just one second...",
          innerThought: "I just checked it, but what if there's a tiny leak? If it leaks, the apartment might flood while we are gone, and it would be entirely my fault. I have to touch the metal dial three more times to feel safe."
        },
        {
          speaker: "Flatmate",
          speech: "I saw you check it twice already! It's dry as a bone. Let's head out, the clock is ticking!",
          innerThought: "I want to be patient, but we are genuinely going to miss the store."
        },
        {
          speaker: "Person",
          speech: "I know... I know it is dry. I'm sorry. I just have these helper rules in my head. Let me do this last touch and we can go immediately.",
          innerThought: "They think I'm being ridiculous, and I feel so stupid. But the burning pressure in my chest won't ease until I feel the tap dial click perfectly."
        }
      ]
    }
  },
  {
    id: "agoraphobia-house",
    query: "won't leave the house",
    clinicalConcept: "Fear of Public Spaces (Agoraphobia)",
    shortExplanation: "This is a sign of Agoraphobia, which is a strong fear of being in places where escape feels hard or help is not nearby. This leads the person to stay inside their 'safe zone' at home.",
    outsideAction: "What people see: Staying inside the home for weeks, relying on delivery services, and feeling panic or shaky at the thought of leaving.",
    insideMind: "What they actually feel: Constant fear of fainting, having a panic attack, or losing control in public where everyone might watch. They feel truly safe only inside their own walls.",
    matchMeter: [
      { disorder: "Agoraphobia", percentage: 90 },
      { disorder: "Panic Disorder", percentage: 75 },
      { disorder: "Major Depressive Disorder (MDD)", percentage: 55 }
    ],
    triOrigin: {
      body: "The amygdala, which is the brain's main panic alert center, becomes way too sensitive. Small changes in heart rate sound a false alarm.",
      mind: "Worrying about the absolute worst-case scenario, like assuming a slightly fast heartbeat means an active heart attack.",
      world: "Having a scary panic attack in a crowded place like a store in the past, leading to avoiding public places to prevent it from happening again."
    },
    audioVisualMock: {
      title: "Audio Log Case #204: Safe Boundary Threshold",
      duration: "2:15",
      description: "Notes regarding boundaries and home-bound behaviors.",
      narrator: "Dr. Melissa Vance, Behavioral Psychologist",
      transcript: "When trying to step past the front gate, height, heart rate, and breathing instantly go up. The safe territory has shrunk to the ground floor. Stepping outside triggers a high-alarm response."
    },
    childhoodEnvironment: "Glow up in an overprotective developmental space where family members frequently emphasized that the outside world is scary or dangerous.",
    childhoodCauses: "Feeling small or unprotected when faced with outside situations, building safety boundaries early that slowly shrank to just the front door.",
    searchSentences: [
      "I don't want to leave my room or step outside my house.",
      "I am scared of public open spaces and going to crowded malls.",
      "I feel trapped and terrified when I leave home, and I need delivery services for everything.",
      "Being outside in public makes me super dizzy and anxious, like I can't escape."
    ],
    tags: ["house", "outside", "room", "leave", "home", "delivery", "agoraphobia", "crowds", "escape"],
    analogy: "Think of Agoraphobia like navigating a world where your safe space is a small bubble, and everything outside that bubble feels like stepped-on high voltage wires. It's not a simple fear of open grass or stores, but rather a terrifying feeling that if your bubble pops, there is no escape and no rescue.",
    conversationScenario: {
      context: "A family member tries to invite them to a nearby park cafe for a sunny afternoon.",
      dialogue: [
        {
          speaker: "Family Member",
          speech: "It's a beautiful sunny day outside! Let's go grab a cold coffee at the cafe down the street. It's only a five-minute walk.",
          innerThought: "They haven't left the apartment in six days. I hope a simple coffee can help clear their mind."
        },
        {
          speaker: "Person",
          speech: "I... I think I'll stay here and order something online instead. You go ahead without me.",
          innerThought: "Just thinking about walking down that bright street makes my knees shake and my breathing shallow. What if I get a panic attack halfway there? What if I faint on the pavement and people stare?"
        },
        {
          speaker: "Family Member",
          speech: "But you've been inside for almost a week! You need some fresh air, honey. It'll make you feel so much better.",
          innerThought: "Why is it so hard to get them to do a simple task? It's just a short walk."
        },
        {
          speaker: "Person",
          speech: "I know you want to help, but when I step past the front gate, it feels like I'm walking a tightrope without a net. It's safe here.",
          innerThought: "I feel so guilty for disappointing them, but my bedroom is the only place my heart doesn't feel like it's exploding with terror."
        }
      ]
    }
  },
  {
    id: "adhd-focus",
    query: "can't focus, always loses keys",
    clinicalConcept: "Attention-Deficit/Hyperactivity Disorder (ADHD)",
    shortExplanation: "This points to ADHD, where the brain's planning and attention filters struggle to block out distractions. This makes it hard to focus, organize objects, and finish daily tasks.",
    outsideAction: "What people see: Starting multiple projects without finishing them, losing keys or phones constantly, looking distracted in conversations, and disorganized desks.",
    insideMind: "What they actually feel: A constant, noisy flow of thoughts. Everything in the environment has the same loud volume, and the brain struggles to decide what to pay attention to first.",
    matchMeter: [
      { disorder: "Attention-Deficit/Hyperactivity Disorder", percentage: 92 },
      { disorder: "Generalized Anxiety Disorder (GAD)", percentage: 45 },
      { disorder: "Dysthymia (Persistent Depressive)", percentage: 35 }
    ],
    triOrigin: {
      body: "The chemical pathways that handle focus and reward have slightly lower activity, making traditional tasks feel under-stimulating to the brain.",
      mind: "Short-term working memory is easily overwritten by new sensations, making the brain jump to the next interesting cue.",
      world: "Busy school or work setups with constant notifications can make these daily focus and organization struggles feel much harder to handle."
    },
    audioVisualMock: {
      title: "Audio Log Case #319: Focus Drift",
      duration: "1:30",
      description: "Assessment interview notes regarding mental focus speeds.",
      narrator: "Sarah Jenkins, Ed.S, Neuropsychologist",
      transcript: "The user describes their brain like ten TV screens playing different channels at the exact same time. There is no simple remote control to turn off the noise, and thoughts jump within seconds."
    },
    childhoodEnvironment: "Living in chaotic or unstructured environments that did not match their organic play pacing, leading to feelings of early classroom exhaustion.",
    childhoodCauses: "A brain that functions differently from birth, struggling to filter signals in an environment demanding quiet, linear focus.",
    searchSentences: [
      "I can never stay focused on one homework task for more than five minutes.",
      "I always lose my keys, wallet, phone, and completely forget my appointments.",
      "My mind is constantly racing with different thoughts at the same time, jumping around.",
      "I start four different tasks but leave them all unfinished because of distractions."
    ],
    tags: ["focus", "keys", "adhd", "forget", "concentrate", "distracted", "scattered", "attention", "organization"],
    analogy: "Having ADHD is like sitting in a room where ten different TV screens are playing different channels at maximum volume, and someone else is holding the remote, constantly channel-surfing. Your brain sees and hears everything with equal strength, making it almost impossible to focus on just one screen.",
    conversationScenario: {
      context: "A teammate trying to coordinate a project outline with them while they keep getting distracted.",
      dialogue: [
        {
          speaker: "Teammate",
          speech: "So, if you can write the introduction by Thursday morning, I can combine it with the slides and submit.",
          innerThought: "They look like they are nodding, but their eyes are scanning the window. I hope they heard the deadline."
        },
        {
          speaker: "Person",
          speech: "Thursday morning sounds perfect. Oh, did you see that bird outside the window? It looks like a blue jay... Wait, what slides were we on?",
          innerThought: "I swear I was listening, but the humming sound of the ceiling fan was so loud, and then my mind drifted to whether blue jays migrate in winter..."
        },
        {
          speaker: "Teammate",
          speech: "We are on slide five, the market analysis. Are you doing okay? We really need to submit this on time.",
          innerThought: "Sigh, they are drifting off again. Do they even care about this presentation?"
        },
        {
          speaker: "Person",
          speech: "Yes! Sorry, my brain just jumped tracks for a second. Slide five, introduction, Thursday. Let me write that down in bold before I lose my thoughts.",
          innerThought: "I feel so embarrassed. I want to show them I care, but sometimes my focus just slips away like wet soap no matter how hard I squeeze."
        }
      ]
    }
  },
  {
    id: "depersonalization-unreal",
    query: "feels like they are looking from outside their body",
    clinicalConcept: "Feeling Detached from Self (DPDR)",
    shortExplanation: "This is a sign of Depersonalization, a state where a person feels separated from their own body or mind. This is often the mind's way of shutting down to protect itself from extreme stress or anxiety.",
    outsideAction: "What people see: Describing the world as looking fake, doll-like, or artificial. Looking lost or speaking in a quiet, flat, or emotionless voice.",
    insideMind: "What they actually feel: A scary sense of watching themselves from the ceiling or like being a robot. They worry they are losing their grip on reality, though they know exactly what is real.",
    matchMeter: [
      { disorder: "Depersonalization-Derealization Disorder", percentage: 95 },
      { disorder: "Panic Disorder", percentage: 60 },
      { disorder: "Post-Traumatic Stress Disorder (PTSD)", percentage: 55 }
    ],
    triOrigin: {
      body: "The emotional centers of the brain temporarily turn down their activity while the analytical centers stay highly active, making things feel emotionless and flat.",
      mind: "Constantly checking one's own feelings and thoughts, which creates a frustrating loop of monitoring and feeling more disconnected.",
      world: "Often triggered by severe stressful events, highly emotional childhood homes, or intense panic attacks where there was no easy way to escape physically."
    },
    audioVisualMock: {
      title: "Audio Log Case #801: Feeling Detached",
      duration: "2:40",
      description: "Note excerpt concerning feelings of detachment and flat emotions.",
      narrator: "Dr. Elena Rostov, Dissociative Specialist",
      transcript: "The student looks at their hands and says they feel like they belong to someone else. They can feel things visually, but the normal warm sense of ownership is gone. The world feels like a flat movie set."
    },
    childhoodEnvironment: "Childhood environments featuring high interpersonal conflict or sudden emotional stress where there was no safe adult advocate.",
    childhoodCauses: "The brain developing an automatic 'safety switch' that shuts off active feeling and ownership of the body when escape from early stress felt impossible.",
    searchSentences: [
      "I feel like I am looking at myself from outside my own physical body.",
      "I look in the mirror and my face feels completely unfamiliar, like a stranger.",
      "The entire world seems totally fake, flat, or simulated, like I am walking in a dream.",
      "My mind is detached and I feel like an emotionless robot watch-observing my actions."
    ],
    tags: ["detached", "mirror", "unreal", "body", "dream", "robot", "movies", "dpdr", "depersonalization", "dissociation"],
    analogy: "Think of Depersonalization like watching a movie of your own life through a foggy window in the projection booth. You walk, talk, and move, but you feel like a puppet whose strings are being pulled by someone else, making your hands, face, and the entire world feel completely simulated and flat.",
    conversationScenario: {
      context: "Walking with a close friend in a highly crowded, brightly lit shopping mall.",
      dialogue: [
        {
          speaker: "Friend",
          speech: "Wow, check out these sales! Isn't this place great? Let's go look at that shoe store over there.",
          innerThought: "They seem really quiet today, almost like they are walking on autopilot."
        },
        {
          speaker: "Person",
          speech: "Yeah, it's nice. It... feels weirdly quiet, though, doesn't it?",
          innerThought: "The fluorescent lights are too bright. I look at my hand holding my bag, and it doesn't feel like it belongs to me. The people walking past look like cardboard cutouts. Am I even awake? Am I real?"
        },
        {
          speaker: "Friend",
          speech: "Quiet? It's super noisy in here! Are you feeling alright? You look a bit pale and distant.",
          innerThought: "They look like they are staring straight through me. It's a little scary."
        },
        {
          speaker: "Person",
          speech: "I'm okay, I promise. I just feel like I'm viewing everything from ten feet behind my own eyes. Like I'm playing a video game of myself.",
          innerThought: "I want to touch the cold metal mall railing just to feel grounding. I hope they don't think I am losing my mind."
        }
      ]
    }
  },
  {
    id: "panic-attack",
    query: "sudden chest beating, fear of dying",
    clinicalConcept: "Panic Disorder",
    shortExplanation: "This is a sign of Panic Disorder, which causes sudden, intense waves of physical fear. These panic attacks peak quickly and cause severe physical symptoms, even when there is no real danger.",
    outsideAction: "What people see: Sudden gasping, holding the chest, shaking, and urgently seeking to leave a room or calling for help even if doctors say they are physically healthy.",
    insideMind: "What they actually feel: A terrifying belief that they are having a heart attack, dying, or losing control of their mind. It feels like an immediate, life-ending emergency.",
    matchMeter: [
      { disorder: "Panic Disorder", percentage: 95 },
      { disorder: "Somatic Symptom Disorder", percentage: 60 },
      { disorder: "Cardiovascular Phobia", percentage: 50 }
    ],
    triOrigin: {
      body: "The brain's built-in suffocation and danger alarms fire off too quickly, dumping sudden adrenaline into the bloodstream and raising the heart rate.",
      mind: "Misinterpreting a normal physical change—like a skipped heartbeat or lightheadedness—as a sure sign of a medical emergency, which makes the panic grow.",
      world: "Usually begins during stressful life periods, such as deep burnout, sudden loss, or major life shifts, and can be made worse by consuming too much caffeine."
    },
    audioVisualMock: {
      title: "Audio Log Case #512: Heart Race Response",
      duration: "1:25",
      description: "Clinic intake assessment detailing a physical panic spike.",
      narrator: "Dr. Aria Thorne, Clinical Psychiatry Liaison",
      transcript: "The student went to the clinic with a fast heartbeat and shallow breathing. Medical tests were completely normal. The patient was sure their body was failing, but it was just a false alarm from the brain."
    },
    childhoodEnvironment: "Living around parents or guardians with high-intensity health anxieties, who taught hyper-vigilance towards any minor physical symptom.",
    childhoodCauses: "Learning early to over-interpret quickened heartbeats or breathlessness as immediate, life-threatening medical emergencies.",
    searchSentences: [
      "I got a sudden racing heavy heartbeat, shaking, and I felt like I was literally dying.",
      "Out of nowhere I had an intense panic spike, couldn't breathe, and my chest felt super tight.",
      "My hands sweat and shake, my chest pounds, and I get terrified that I am having a heart attack.",
      "I get sudden waves of extreme terror, lightheadedness, and I feel like I'm losing my mind."
    ],
    tags: ["dying", "heart", "chest", "panic", "shaking", "tightness", "breathe", "gasping", "terror", "adrenaline"],
    analogy: "A panic attack is like your brain's fire alarm system going off at full blast, complete with sprinklers and sirens, because of a tiny bit of toast smoke. There is no physical fire, but your body experiences the exact same racing heart, hot sweats, gasping, and absolute terror of a active emergency.",
    conversationScenario: {
      context: "Sitting in a quiet university lecture hall when a sudden panic attack starts.",
      dialogue: [
        {
          speaker: "Classmate",
          speech: "Did you understand what the professor said about the exam format next week?",
          innerThought: "Why are they suddenly breathing so fast? Their face is totally white."
        },
        {
          speaker: "Person",
          speech: "I... I think I need to step out of the room. Right now.",
          innerThought: "My heart is beating so fast it hurts. I can't catch a deep breath. My fingers are going completely numb. Am I having a stroke? I have to escape this room immediately."
        },
        {
          speaker: "Classmate",
          speech: "Wait, the lecture is almost over. Is something wrong? You look really sweaty.",
          innerThought: "Oh no, they look like they are about to collapse. Should I call someone?"
        },
        {
          speaker: "Person",
          speech: "I just need some fresh air... I have to go to the restroom.",
          innerThought: "My legs feel like jelly, and my chest is in a vice. If I don't leave this crowded hall, everyone is going to see me collapse."
        }
      ]
    }
  },
  {
    id: "eating-disorder",
    query: "skips meals, tracks calories relentlessly",
    clinicalConcept: "Anorexia Nervosa (Calorie Restriction)",
    shortExplanation: "This points to Anorexia, where a strong worry about weight leads to strict limits on food intake, constant tracker checks, and viewing one's body size in an inaccurate way.",
    outsideAction: "What people see: Tracking exact food weights, avoiding eating in social settings, cutting food into tiny pieces, and wearing loose clothing.",
    insideMind: "What they actually feel: A deep fear of losing control over their body. They feel their direct worth is tied to calories and numbers, and any weight change represents a personal failure.",
    matchMeter: [
      { disorder: "Anorexia Nervosa (Restrictive)", percentage: 95 },
      { disorder: "Obsessive-Compulsive Disorder (OCD)", percentage: 50 },
      { disorder: "Body Dysmorphic Disorder (BDD)", percentage: 45 }
    ],
    triOrigin: {
      body: "The brain's normal chemical rewards for eating food are altered, sometimes triggering anxiety or worry rather than feeling good and satisfied.",
      mind: "Having thin-ice perfectionism and difficulty being flexible with rules, alongside visual processing that over-focuses on imagined body flaws.",
      world: "Made worse by cultures highlighting extreme thinness or competitive pressures, or homes where controlling food replaces talking about difficult feelings."
    },
    audioVisualMock: {
      title: "Audio Log Case #644: Body Image Lens",
      duration: "2:05",
      description: "Outpatient clinical review detailing dietary restriction habits.",
      narrator: "Dr. Elena Patel, Eating Disorders Specialist",
      transcript: "When looking at their photos, the patient's brain struggles to see their true size. Instead, worry centers distort the image. Keeping track of food numbers becomes a protective shield."
    },
    childhoodEnvironment: "Raised with high emphasis on physical achievements, strict food rules, body image standards, or avoidance of open emotional discussions.",
    childhoodCauses: "Using caloric control as a secret tactical coping mechanism to secure autonomy and predictability when other developmental areas felt chaotic.",
    searchSentences: [
      "I track every single calorie on my tracker and aggressively skip eating meals.",
      "I feel incredibly guilty after eating any small snack and check my weight continuously.",
      "I avoid dining outside with friends because I am terrified of gaining fat.",
      "I weigh my food on kitchen scales and feel like my entire self-worth is a body number."
    ],
    tags: ["meals", "calories", "calories", "skip", "weight", "scales", "eating", "thin", "diet", "anorexia", "guilt"],
    analogy: "Think of calorie restriction like holding a magnifying glass that only magnifies what you perceive as physical flaws. It creates a critical voice in your head that tells you that control over every single gram of food is the only way to be safe, turning eating from nourishment into a dangerous, anxious scorecard.",
    conversationScenario: {
      context: "A group of close friends decides to celebrate a birthday with pizza.",
      dialogue: [
        {
          speaker: "Friend",
          speech: "Here, take a slice! It's warm and fresh out of the oven. We got your favorite toppings!",
          innerThought: "I hope they eat some. They've been looking so thin lately, and they always make excuses at dinner."
        },
        {
          speaker: "Person",
          speech: "No, thank you, I actually ate a huge breakfast right before coming here. I'm completely stuffed!",
          innerThought: "That slice is at least 350 calories, and if it has oil on the cheese, it's more. If I eat it, my weekly tracking is ruined. I must stay strong and decline."
        },
        {
          speaker: "Friend",
          speech: "Come on, just one small slice! It's a celebration, one piece won't hurt, I promise.",
          innerThought: "They always say they just ate. It's a bit worrying."
        },
        {
          speaker: "Person",
          speech: "I'd love to, but my stomach is really sensitive today. I'll just have some water, but you guys go ahead and enjoy!",
          innerThought: "The anxiety is twisting my throat in knots. I can see them looking at my empty plate, wondering why I never join in. I wish I could just enjoy food like normal people do."
        }
      ]
    }
  },
  {
    id: "social-phobia",
    query: "avoids group presentations, scared of strangers",
    clinicalConcept: "Social Phobia",
    shortExplanation: "This represents Social Anxiety, which is a strong, persistent fear of being watched, judged, or embarrassed in front of others. This leads the person to avoid public speaking and group meetings.",
    outsideAction: "What people see: Shunning group projects, staying quiet in class, stuttering, sweating, or looking down at the floor when asked to speak.",
    insideMind: "What they actually feel: Worry that they will say something foolish, look awkward, and be judged as weird or incompetent. They assume others are constantly noticing their tension.",
    matchMeter: [
      { disorder: "Social Anxiety Disorder", percentage: 95 },
      { disorder: "Avoidant Personality Disorder", percentage: 70 },
      { disorder: "Generalized Anxiety Disorder (GAD)", percentage: 50 }
    ],
    triOrigin: {
      body: "The emotional threat center of the brain reacts strongly to social threats, like neutral or unsmiling faces, and fails to register normal safety signals.",
      mind: "Worrying that everyone is judging them critically and replaying social situations over and over, focusing only on their minor mistakes.",
      world: "Linked to past experiences like being teased at school, having very protective or highly critical parents, or experiencing an embarrassing public moment."
    },
    audioVisualMock: {
      title: "Audio Log Case #711: Fear of Evaluation",
      duration: "1:52",
      description: "Speech-exposure trial recording under laboratory observation.",
      narrator: "Dr. Roberta Chen, Social Anxiety Specialist",
      transcript: "Before speaking, the student feels rapid breathing and a tight throat. In order to cope, they avoid looking at the audience, projecting their worst fears onto the faces of neutral observers."
    },
    childhoodEnvironment: "Frequent peer rejection, early childhood teasing/bullying, or childhood spaces where performing mistakes was highly criticized.",
    childhoodCauses: "Internalizing social spaces as highly dangerous theaters of judgment, causing the alarm system to instantly lock up to prevent spotlight attention.",
    searchSentences: [
      "I am completely terrified of giving a class presentation or talking in front of groups.",
      "I freeze up and sweat when talking to strangers or asking teachers questions.",
      "I assume everyone is staring at my awkward movements and judging me as weird.",
      "My throat locks up, my neck gets stiff, and I stay dead silent to avoid attention."
    ],
    tags: ["presentation", "strangers", "social", "anxiety", "speak", "stage", "talking", "fear", "judgement", "shyness"],
    analogy: "Social anxiety is like walking onto a theater stage under a burning spotlight, with thousands of silent judges watching your every blink, hand movement, and whisper, ready to buzz you out. You feel that any mistake or awkward pause will be remembered by everyone forever.",
    conversationScenario: {
      context: "Being introduced to a group of new classmates at a university student orientation.",
      dialogue: [
        {
          speaker: "Peer",
          speech: "Hey! We're planning to form a weekly study group for our psychology lectures. Do you want to join us?",
          innerThought: "They seem nice but are backing away slightly. Maybe they are just shy."
        },
        {
          speaker: "Person",
          speech: "Oh... um, yeah... that sounds... nice. I have to check my timetable first.",
          innerThought: "My voice sounded so shaky and weirdly quiet. Did I smile too much or look awkward? They probably think I am totally unsocial and wish I would go away."
        },
        {
          speaker: "Peer",
          speech: "Sure, no pressure at all! We meet in the library lounge on Tuesdays. Hope to see you there!",
          innerThought: "They look really uncomfortable. I'll give them some space."
        },
        {
          speaker: "Person",
          speech: "Okay, thank you so much! I'll let you know.",
          innerThought: "My chest is so incredibly tight. I should have said something more interesting or friendly. Now I'm just going to walk away slowly so I don't embarrass myself further."
        }
      ]
    }
  },
  {
    id: "generalized-anxiety",
    query: "worries continuously about normal duties, tense muscles",
    clinicalConcept: "Generalized Anxiety Disorder (GAD)",
    shortExplanation: "This describes Generalized Anxiety Disorder (GAD). GAD triggers an over-active stream of daily worries about health, money, family, or work, making it tough for the nervous system to relax.",
    outsideAction: "What people see: Constantly asking for reassurance, staying restless, trouble concentrating, physical shaking, and complaining about tense neck or shoulders.",
    insideMind: "What they actually feel: A persistent feeling that 'something terrible is about to happen.' They feel stuck on high alert, mentally analyzing every worst-case scenario.",
    matchMeter: [
      { disorder: "Generalized Anxiety Disorder (GAD)", percentage: 95 },
      { disorder: "Panic Disorder", percentage: 65 },
      { disorder: "Insomnia (Sleep Disruption)", percentage: 60 }
    ],
    triOrigin: {
      body: "An overactive autonomic nervous system that remains in a slight flight-or-fight response, leading to muscle tension and physical exhaustion.",
      mind: "An unconscious habit of treating future uncertainties as active physical threats, seeking 100% safety guarantees where none exist.",
      world: "Growing up in unpredictable or hyper-vigilant family structures where safety felt temporary, or experiencing long phases of high adult stress."
    },
    audioVisualMock: {
      title: "Audio Log Case #108: Chronic Vigilance",
      duration: "1:55",
      description: "Review of muscle tension and daily worry patterns under typical clinical examination.",
      narrator: "Dr. Katherine Harmon, Anxiety Clinic Director",
      transcript: "The patient reports they cannot turn off their mind, especially in quiet hours. Physical tests indicate significant chronic neck tension. They sleep poorly because their mind is busy staging futures."
    },
    childhoodEnvironment: "Living in households with chronic stress, parent-level emotional instability, or a quiet unspoken anticipation of impending bad occurrences.",
    childhoodCauses: "Adopting a psychological shield that 'worrying protects me' — thinking that by anticipating every catastrophe, they can prevent them from happening.",
    searchSentences: [
      "I worry continuously and obsessively about my schoolwork, family, and minor daily duties.",
      "My muscle tension is constant, my shoulders are sore, and I can't seem to relax.",
      "My brain keeps spinning with the feeling that something terrible is about to happen.",
      "I stay trapped in endless loops analyzing worst-case scenarios for tomorrow."
    ],
    tags: ["worry", "gad", "tension", "tense", "muscles", "shoulders", "nervous", "anxious", "restless", "future"],
    analogy: "Generalized anxiety (GAD) is like having twenty browser tabs open in your mind all at once, and every single tab is playing a different warning video about a potential crisis. It is a non-stop hum of 'what-ifs' that keeps your physical muscles as tight as violin strings.",
    conversationScenario: {
      context: "A partner talking about booking a train ticket for a trip next weekend.",
      dialogue: [
        {
          speaker: "Partner",
          speech: "I'll book our tickets for the 3 PM train next Friday. It's much cheaper than the morning one.",
          innerThought: "This is a simple booking. I hope we don't turn it into a huge coordination debate."
        },
        {
          speaker: "Person",
          speech: "Wait, isn't 3 PM way too late? What if there's bumper-to-bumper traffic to the station? What if the train breaks down?",
          innerThought: "My neck is so stiff today. If we miss that train, our entire weekend is ruined, and we'll lose the hotel deposit..."
        },
        {
          speaker: "Partner",
          speech: "Don't worry, we'll leave the house a full hour early. There is plenty of buffer time.",
          innerThought: "They are starting to spin worst-case scenarios again. I need to reassure them."
        },
        {
          speaker: "Person",
          speech: "But what if it rains heavily? We should book the morning train instead, just to be 100% safe. It's worth the extra cost.",
          innerThought: "I can't shut off these scenarios. I feel like if I stop worrying and let my guard down, that's exactly when life will go wrong."
        }
      ]
    }
  },
  {
    id: "major-depression",
    query: "sad and empty, has no energy to get out of bed",
    clinicalConcept: "Major Depressive Disorder (MDD)",
    shortExplanation: "This represents Major Depressive Disorder (MDD). Depression is not just sadness; it is a heavy exhaustion where the mind and body shut down and lose all warmth, drive, and hope.",
    outsideAction: "What people see: Moving or speaking slowly, staying in bed for days, dropping hobbies and calls, changes in appetite, and zero physical vitality.",
    insideMind: "What they actually feel: A hollow numbness, deep worthlessness, and a fear that these heavy clouds will never lift. It feels as if they are wade-walking through cold, thick tar.",
    matchMeter: [
      { disorder: "Major Depressive Disorder (MDD)", percentage: 96 },
      { disorder: "Persistent Depressive Disorder (Dysthymia)", percentage: 80 },
      { disorder: "Generalized Anxiety Disorder (GAD)", percentage: 55 }
    ],
    triOrigin: {
      body: "Temporary imbalances in neurochemical messengers like serotonin and dopamine, causing physical feelings of heavy fatigue and diminished appetite.",
      mind: "A negative mental filter where successes are ignored as fluke events, while minor setbacks are interpreted as proof of personal failure.",
      world: "Experiencing severe life changes, physical illness, severe burnout, or prolonged social isolation without stable emotional lifelines."
    },
    audioVisualMock: {
      title: "Audio Log Case #402: Affective Low",
      duration: "2:20",
      description: "Summary notes on severe energy loss and persistent flat mood tracking.",
      narrator: "Dr. Sandra Cole, Mood Disorders Lead",
      transcript: "The student describes their condition as an emotional winter. They know they should do simple things like answer texts, but the cognitive energy to make decisions feels completely depleted."
    },
    childhoodEnvironment: "Raised in settings with low emotional warmth, early loss of parental presence, or excessive criticism that taught achievement-only worth.",
    childhoodCauses: "Internalizing early setbacks as deep personal insufficiency, leading the brain to hibernate or shut down when facing adult exhaustion.",
    searchSentences: [
      "I feel incredibly sad, empty, and have zero physical energy to get out of bed.",
      "I have lost all motivation to study, answer texts, or do things I normally enjoy.",
      "Everything feels too heavy and hopeless, and I just lie in bed for days crying.",
      "There is a hollow numbness in my chest, and I feel totally useless and exhausted."
    ],
    tags: ["sad", "empty", "bed", "energy", "depression", "depressed", "unmotivated", "crying", "numbness", "willpower", "exhaustion"],
    analogy: "Depression is like wading through chest-deep, freezing-cold mud while wearing a heavy suit of steel armor. It isn't just sadness; it is a total loss of power, where even the simplest actions—like turning over in bed or replying to a text—feel like trying to lift a mountain.",
    conversationScenario: {
      context: "A close friend knocks on their bedroom door after they missed three days of clinical lectures.",
      dialogue: [
        {
          speaker: "Friend",
          speech: "Hey, are you in there? I brought some soup from the dining hall. You've missed three days of clinical lectures.",
          innerThought: "I'm really worried. Their door is locked, and the room is pitch-black. This isn't like them."
        },
        {
          speaker: "Person",
          speech: "Thanks... you can just leave it by the door. I'm just really tired today.",
          innerThought: "I feel like a hollow shell. I don't want them to see me like this, lying in the dark with unwashed hair. I'm just a burden to everyone, and I can't make myself sit up anyway."
        },
        {
          speaker: "Friend",
          speech: "Can I come in? We're all worried about you, and you're not answering any calls. Let's just talk for five minutes.",
          innerThought: "I want to respect their space, but they need to know they aren't alone."
        },
        {
          speaker: "Person",
          speech: "I'm sorry. I just don't have the energy to talk right now. Is it okay if I see you next week?",
          innerThought: "My body feels like it weighs five hundred pounds. Even speaking these few words feels like trying to run a marathon."
        }
      ]
    }
  },
  {
    id: "ptsd-trauma",
    query: "re-lives past bad experiences when hearing loud noises",
    clinicalConcept: "Post-Traumatic Stress Disorder (PTSD)",
    shortExplanation: "This relates to Post-Traumatic Stress Disorder (PTSD). It occurs when a highly stressful or scary past event leaves the brain's alarm system stuck on high alert, causing the present to trigger old memories.",
    outsideAction: "What people see: Jumping at sudden sounds like car doors, avoiding specific places, having sudden outbursts of anger, or isolating themselves when reminded of the past.",
    insideMind: "What they actually feel: Experiencing the past trauma as if it is happening right now in the room. They feel unsafe, on-edge, and constantly scan crowds for danger.",
    matchMeter: [
      { disorder: "Post-Traumatic Stress Disorder (PTSD)", percentage: 95 },
      { disorder: "Panic Disorder", percentage: 70 },
      { disorder: "Social Anxiety", percentage: 50 }
    ],
    triOrigin: {
      body: "The brain's hippocampus struggles to tag traumatic memories as 'fully over,' meaning a loud sound causes the amygdala to initiate immediate fight-or-fight reflexes.",
      mind: "Constantly remaining on-edge to prevent being caught off-guard, alongside severe guilt or negative beliefs about why the stressful event occurred.",
      world: "Surviving physical accidents, high-stress occupations, violent community occurrences, or sudden unexpected loss of family protection."
    },
    audioVisualMock: {
      title: "Audio Log Case #903: Reflex Hyper-Vigilance",
      duration: "2:10",
      description: "Recording regarding startle response and trauma trigger exposure.",
      narrator: "Dr. Clara Vance, Trauma & PTSD Specialist",
      transcript: "A sudden clap instantly sparks a full neuro-physical panic. The body responds before the logical mind can realize there is no current danger. The past is active in the physical nervous system today."
    },
    childhoodEnvironment: "Grew up in highly chaotic, unsafe, or emotionally volatile households with high fear of unpredictability.",
    childhoodCauses: "Learning that physical safety must be protected by constant scan-alertness, leaving the threat alarm perpetually open.",
    searchSentences: [
      "A sudden loud noise makes me jump and instantly re-live a nightmare past event.",
      "I have severe flashbacks of old trauma that make me feel like I am in danger right now.",
      "I can't sleep because of graphic nightmares about things that happened years ago.",
      "I stay extremely on edge, scanning crowds and jumpy when hearing car doors slam."
    ],
    tags: ["relive", "past", "noises", "trauma", "ptsd", "nightmare", "flashback", "jumpy", "startle", "abuse", "accidents"],
    analogy: "PTSD is like having a dangerous memory stored in your brain with a broken date stamp. When a loud noise or trigger fires, your brain doesn't see it as an old history; it thinks the event is happening right now in this exact second, triggering a full defensive panic reaction.",
    conversationScenario: {
      context: "Walking down a peaceful street near campus when a car engine suddenly backfires loudly.",
      dialogue: [
        {
          speaker: "Companion",
          speech: "Whoa, that delivery car needs a new muffler! That was incredibly loud.",
          innerThought: "Just a loud car bang, nothing special. Why did they suddenly crouch down?"
        },
        {
          speaker: "Person",
          speech: "[Ducks down, trembling, breathing rapidly, scanning the empty street with wide eyes]",
          innerThought: "That was an explosion. It's happening again. Where is the cover? I need to get away from the street right now. It is not safe."
        },
        {
          speaker: "Companion",
          speech: "Hey, hey, are you okay? Take a breath. It was just a car backfiring. You're completely safe, look around.",
          innerThought: "Their heart is pounding so hard I can see it. They look terrified."
        },
        {
          speaker: "Person",
          speech: "I... I need a second. My chest... let's walk down this side alley immediately.",
          innerThought: "My brain was completely back in that accident. I could smell the smoke. I have to look around to make sure there are no other hazards."
        }
      ]
    }
  },
  {
    id: "borderline-instability",
    query: "fear of abandonment, sudden intense friendship swings",
    clinicalConcept: "Borderline Personality Disorder (BPD)",
    shortExplanation: "This points to features of Borderline Personality Disorder (BPD), a condition where individuals experience highly intense feelings, relationship ups and downs, and a deep fear of being left alone.",
    outsideAction: "What people see: Alternating between loving and hating colleagues, urgent efforts to keep a friend nearby, impulsive decisions, and sudden emotional storms.",
    insideMind: "What they actually feel: A terrifying sense of emptiness and a constant, burning anxiety that everyone they love will reject them. They feel emotional pain at extreme volumes.",
    matchMeter: [
      { disorder: "Borderline Personality Disorder (BPD)", percentage: 92 },
      { disorder: "Bipolar Disorder II", percentage: 65 },
      { disorder: "Complex PTSD (C-PTSD)", percentage: 85 }
    ],
    triOrigin: {
      body: "The emotional control networks of the brain are highly sensitive, causing emotional waves to spike much faster and take longer to cool down.",
      mind: "Black-and-white thinking ('all-good' or 'all-bad'), making a tiny delay in a text reply feel like absolute proof of abandonment.",
      world: "Growing up in invalidating environments where emotional needs were mocked, ignored, or treated as bad, leaving feelings disconnected."
    },
    audioVisualMock: {
      title: "Audio Log Case #105: Relational Waves",
      duration: "2:02",
      description: "Session notes analyzing fear of sudden rejection and relational patterns.",
      narrator: "Dr. Claire Bennet, Dialectical Therapist",
      transcript: "The customer says they feel like they don't have an emotional skin. A simple disagreement with their flatmate triggers an instant, massive wave of panic that their friend will depart forever."
    },
    childhoodEnvironment: "Frequently raised in environments with highly unstable caretakers, direct abandonment, or repeated emotional invalidation.",
    childhoodCauses: "Developing extreme emotional alarms as a desperate way to keep caretakers close and secure validation when quieter needs failed.",
    searchSentences: [
      "I am absolutely terrified of my friends abandoning me or leaving me alone.",
      "I go from loving my friend to completely hating them over one text delay.",
      "I have massive mood swings and feel a hollow, dark emptiness inside my soul.",
      "My relationships are intense, and a tiny argument feels like my world is ending."
    ],
    tags: ["abandon", "abandonment", "swings", "splitting", "borderline", "bpd", "relationships", "emptiness", "friendship", "conflict"],
    analogy: "Living with emotional instability (BPD) is like having no emotional outer skin. While others have a protective layer that dampens small social bumps, a slight delay in a text reply or a change in tone feels like a direct, third-degree burn of extreme abandonment.",
    conversationScenario: {
      context: "A friend says they can't hang out tonight because they are too tired after work.",
      dialogue: [
        {
          speaker: "Friend",
          speech: "Hey, I'm so exhausted from work, would you mind if we reschedule our dinner tonight?",
          innerThought: "I'm genuinely exhausted, I just need to sleep. I hope we can do Saturday instead."
        },
        {
          speaker: "Person",
          speech: "Oh. Sure. That's fine. Go ahead.",
          innerThought: "They hate me. They are finally leaving. They're making up excuses because I'm too clingy and they can't stand being around me anymore. I knew they would abandon me."
        },
        {
          speaker: "Friend",
          speech: "Thanks for understanding! You are the best. Let's do Saturday at that new Italian spot instead!",
          innerThought: "Great, glad they are cool with it. I'll catch up on sleep."
        },
        {
          speaker: "Person",
          speech: "Actually, don't worry about Saturday. If you don't care about our plans, we don't have to hang out ever again.",
          innerThought: "I'm pushing them away, but if they're going to reject me eventually, I need to protect myself and walk away first before they can hurt me."
        }
      ]
    }
  },
  {
    id: "bipolar-oscillations",
    query: "extreme high energy periods followed by deep low crashes",
    clinicalConcept: "Bipolar Disorder",
    shortExplanation: "This describes Bipolar Disorder, which causes significant fluctuations in mood, energy, and thinking speeds—moving from intense 'highs' (mania/hypomania) to intense physical 'lows' (depression).",
    outsideAction: "What people see: Talking extremely fast, sleeping very little but stay hyperactive, spending excessively, then suddenly disappearing and sleeping for days in depression.",
    insideMind: "What they actually feel: During highs, a roaring euphoria where anything feels possible. During crashes, a heavy, silent confusion about who they were just days prior.",
    matchMeter: [
      { disorder: "Bipolar Disorder (Type I/II)", percentage: 95 },
      { disorder: "Attention-Deficit/Hyperactivity Disorder (ADHD)", percentage: 60 },
      { disorder: "Major Depressive Disorder (MDD)", percentage: 70 }
    ],
    triOrigin: {
      body: "Strong genetic factors that cause the brain's natural circadian rhythms and energetic switches to fluctuate significantly between hyper-drive and shutdown.",
      mind: "During highs, cognitive filters that analyze risk are turned off. During lows, cognitive schemas take a severe, heavy self-blaming form.",
      world: "Severe disruptions in normal daily sleep schedules, high stress, or seasonal shifts can trigger or speed up these mood sweeps."
    },
    audioVisualMock: {
      title: "Audio Log Case #704: Mood Cycles",
      duration: "2:30",
      description: "Analysis of severe mood oscillations and rhythmic physical transition waves.",
      narrator: "Dr. Jillian Mercer, Psychobiologist",
      transcript: "Last week they slept two hours a night and wrote half a book with absolute confidence. This morning, they could barely lift their head to answer simple questions. The energetic rhythm of the brain has crashed."
    },
    childhoodEnvironment: "A family space where emotional atmospheres regularly fluctuated wildly between celebration and heavy, silent low phases.",
    childhoodCauses: "An organic neurochemical sweep that destabilizes energy levels, which early childhood stresses can activate or accelerate.",
    searchSentences: [
      "I go through phases of extreme high energy where I write and clean, followed by terrible crashes.",
      "I talk incredibly fast and sleep two hours a night, then suddenly I spend weeks in bed.",
      "My mood swings from absolute roaring euphoria to heavy, quiet darkness.",
      "I make risky impulsive decisions when feeling amazing, then suffer deep depression later."
    ],
    tags: ["bipolar", "highs", "lows", "crashes", "mania", "manic", "euphoria", "risk", "energy", "cycles", "swings"],
    analogy: "Think of Bipolar oscillations like driving a car where the accelerator is stuck to the floor for a full week, and then suddenly the engine shuts off completely while you are going up a steep hill. It is a roller coaster of speed and power followed by a deep, hollow stillness.",
    conversationScenario: {
      context: "Meeting a study colleague during a sudden transition from a hyper-energy phase into a low crash.",
      dialogue: [
        {
          speaker: "Colleague",
          speech: "Wow, earlier this week you gave that amazing four-hour pitch and were talking about starting three new projects. Are you ready to start on the first draft?",
          innerThought: "They had so much energy on Tuesday! I want to ride that wave."
        },
        {
          speaker: "Person",
          speech: "I... actually, I don't think I can do any of those projects anymore. I'm sorry.",
          innerThought: "How was I so confident on Tuesday? I didn't sleep for three days and felt like a genius. Today, just reading this title block makes me want to cry. I feel completely hollow."
        },
        {
          speaker: "Colleague",
          speech: "But you were so hyped! You said you had a perfect vision of how everything would connect across semesters.",
          innerThought: "Did I miss something? They look completely different and exhausted."
        },
        {
          speaker: "Person",
          speech: "I was mistaken. I shouldn't have promised those things. I just... need some time off.",
          innerThought: "They must think I'm completely unreliable. The high-energy version of me feels like a different person who left behind checks I can't cash."
        }
      ]
    }
  },
  {
    id: "insomnia-sleep",
    query: "cannot fall asleep, lies awake worrying for hours",
    clinicalConcept: "Insomnia (Sleep Disruption)",
    shortExplanation: "This represents Insomnia, a state where the natural process of falling or staying asleep is blocked. The bed becomes a place of frustration and mental worry rather than a rest sanctuary.",
    outsideAction: "What people see: Tossing and turning for hours, looking exhausted during the day, drinking excess coffee, and feeling irritable or forgetful.",
    insideMind: "What they actually feel: Severe anxiety about sleep loss, counting the minutes until the morning alarm, and a mind that runs fast with unresolved daytime tasks.",
    matchMeter: [
      { disorder: "Insomnia (Sleep Disruption)", percentage: 95 },
      { disorder: "Generalized Anxiety Disorder (GAD)", percentage: 75 },
      { disorder: "Somatic Symptom Disorder", percentage: 40 }
    ],
    triOrigin: {
      body: "An elevated level of cortisol and active arousal hormones at night, keeping the brain's awake centers active despite physical exhaustion.",
      mind: "Worrying about not sleeping ('If I don't sleep now, my tomorrow is ruined'), which sounds the panic alarm and actively keeps the brain awake.",
      world: "Irregular sleep schedules, high blue-light exposure before bed, stressful exam weeks, or bringing daytime work directly into the bedroom."
    },
    audioVisualMock: {
      title: "Audio Log Case #331: Nocturnal Arousal",
      duration: "1:40",
      description: "Intake log on somatic sleep-avoidance and nighttime adrenaline spikes.",
      narrator: "Dr. Victoria Vance, Sleep Medicine Specialist",
      transcript: "The customer states that as soon as their head touches the pillow, their chest feels light and a sudden surge of physical alertness fires. They have learned to associate their bed with an active struggle to survive."
    },
    childhoodEnvironment: "Raised in environments with late-night noise, arguments, or lack of peaceful nighttime safety rules.",
    childhoodCauses: "Building an early association that staying alert at night is necessary to watch for danger or process unresolved daytime distress.",
    searchSentences: [
      "I lie awake tossing and turning for hours every single night.",
      "As soon as my head touches the pillow my brain starts racing and I can't sleep.",
      "I am constantly watching the clock count down to my morning alarm with extreme anxiety.",
      "I spend hours worrying about not sleeping and wake up feeling totally exhausted."
    ],
    tags: ["sleep", "insomnia", "awake", "tossing", "pillow", "night", "tired", "bed", "restless", "nighttime"],
    analogy: "Insomnia is like trying to catch a heavy train that only stops at your station for a few seconds. The more you run and throw yourself after it, panic-stricken by what will happen if you miss it, the further the train speeds away from you into the dark night.",
    conversationScenario: {
      context: "Lying in bed beside their partner at 3:15 AM.",
      dialogue: [
        {
          speaker: "Partner",
          speech: "[Mumbles sleepily] You're still tossing and turning... please go to sleep, honey.",
          innerThought: "I wish they could rest. Their sighing is keeping me slightly awake too."
        },
        {
          speaker: "Person",
          speech: "I'm trying! My brain just won't stop counting how many hours I have left before the alarm fires.",
          innerThought: "It's already 3:15. If I fall asleep right now, I'll get exactly 3.5 hours of sleep. I'm going to look like a zombie at my lab presentation tomorrow. Why can't I just shut this off?"
        },
        {
          speaker: "Partner",
          speech: "Just close your eyes, take slow breaths, and don't think about anything.",
          innerThought: "Reassurance is the best way to help them settle."
        },
        {
          speaker: "Person",
          speech: "I wish it was that simple. The more I try to force my eyes shut, the more awake my body feels, like my veins are pumped with coffee.",
          innerThought: "This bed is starting to feel like a cage. I'm terrified of another exhausted, brain-fogged day."
        }
      ]
    }
  },
  {
    id: "narcissistic-vulnerability",
    query: "needs constant admiration, can't handle feedback",
    clinicalConcept: "Narcissistic Personality (Fragile Self-Esteem)",
    shortExplanation: "This aligns with traits of Narcissistic Personality Disorder (NPD). Behind an outward appearance of grandiosity, confidence, and superiority lies a highly vulnerable, fragile self-esteem that feels deeply threatened by criticism or lack of spotlight attention.",
    outsideAction: "What people see: Talking proudly about accomplishments, reacting with intense anger or coldness to minor feedback, demands for special treatment, and looking self-absorbed.",
    insideMind: "What they actually feel: A constant, exhausting pressure to look successful and flawless. They feel a deep, nagging fear that if they are seen as ordinary, they are actually worthless and unlovable.",
    matchMeter: [
      { disorder: "Narcissistic Personality Disorder (NPD)", percentage: 92 },
      { disorder: "Generalized Anxiety Disorder (GAD)", percentage: 45 },
      { disorder: "Major Depressive Disorder (Depressive Crash)", percentage: 60 }
    ],
    triOrigin: {
      body: "Brain networks that handle emotional empathy and self-regulation operate with different activation thresholds, making emotional setbacks feel raw and intense.",
      mind: "Viewing relationships as a hierarchy of status ('either I am the best, or I am nothing') as a subconscious defense mechanism to shield against deep shame.",
      world: "Growing up with caregivers who praised them only for high achievements/status, or conversely, treated them as an extension of their own ego, neglecting their simple emotional needs."
    },
    audioVisualMock: {
      title: "Audio Log Case #640: Grandiose Defense",
      duration: "2:08",
      description: "Notes regarding response to constructive performance feedback.",
      narrator: "Dr. Sarah Jenkins, Personality Disorder Specialist",
      transcript: "The patient reacted with immediate hostility when their supervisor suggested a minor report correction. They spent an hour devaluing the manager's skills. Beneath this anger lies a severe anxiety that their core competence is failing."
    },
    childhoodEnvironment: "Grew up with family members who offered praise only when they won awards, demanding perfection while ignoring their basic, human feelings.",
    childhoodCauses: "Learning that being 'normal' or having flaws means being completely ignored or rejected, forcing the child to build a perfect, shiny armor of superiority.",
    searchSentences: [
      "I feel incredibly superior to others but crumble internally when someone criticizes me.",
      "I need constant admiration and praise from people, and I hate being treated as ordinary.",
      "I react with extreme cold anger or deep resentment when people point out my flaws.",
      "I keep telling everyone about my high achievements because I am terrified of being seen as a loser."
    ],
    tags: ["narcissist", "narcissism", "npd", "ego", "criticism", "grandiosity", "superior", "admire", "admired", "fragile", "shame"],
    analogy: "Think of fragile grandiosity like carrying a massive, beautiful glass trophy above your head. You look incredibly accomplished and shiny, but you are constantly terrified of stumbling or getting bumped, because even the tiniest speck of feedback can shatter the glass into a million sharp pieces.",
    conversationScenario: {
      context: "Reviewing a draft presentation with a coworker who suggests a slight slide modification.",
      dialogue: [
        {
          speaker: "Coworker",
          speech: "The presentation is excellent! I was just thinking, should we shorten slide three a bit so our audience doesn't get overwhelmed by too many numbers?",
          innerThought: "I hope they don't take this the wrong way. I genuinely want our team layout to look clean."
        },
        {
          speaker: "Person",
          speech: "Slide three? That is literally the most important slide! If they get overwhelmed by basic data, they shouldn't even be in our meeting. I spent hours tailoring that slide, and it's perfect.",
          innerThought: "How dare they tell me how to do my work? If my slide isn't perfect, it means they think I am stupid or incompetent. I must defend my reputation and put them in their place."
        },
        {
          speaker: "Coworker",
          speech: "No, I didn't mean it wasn't good! It's incredibly detailed. I just wanted to make sure we stay within our strict 10-minute slot.",
          innerThought: "They are getting so defensive. I was just trying to help us save time."
        },
        {
          speaker: "Person",
          speech: "If they want us to present, they will make time. I think we should leave my slides exactly as they are. I've successfully run projects much larger than this one before.",
          innerThought: "My chest is on fire. I can't let them win this. If I agree to change it, I'll admit I made a mistake, and I cannot allow myself to look flawed."
        }
      ]
    }
  },
  {
    id: "autism-masking",
    query: "exhausted from pretending to be normal, sensory overload",
    clinicalConcept: "Autism Spectrum (Sensory Sensitivity & Masking)",
    shortExplanation: "This coordinates with traits of Autism Spectrum Disorder (ASD), particularly in individuals who have learned to 'mask' or hide their natural traits in public. This constant suppression of sensory overwhelm and mimicking of social behaviors results in heavy mental burnout.",
    outsideAction: "What people see: Looking polite and quiet, having sudden severe fatigue after brief social outings, preferring strict routines, and over-focusing on niche special topics.",
    insideMind: "What they actually feel: The sound of fluorescent lights feels like a physical saw cutting through the head. They are constantly over-analyzing eye contact, hand gestures, and slang to blend in, feeling like an alien visitor.",
    matchMeter: [
      { disorder: "Autism Spectrum Disorder (ASD)", percentage: 94 },
      { disorder: "Social Anxiety Disorder", percentage: 65 },
      { disorder: "Major Depressive Disorder (Burnout)", percentage: 55 }
    ],
    triOrigin: {
      body: "A nervous system with highly intense connectivity, translating everyday sounds, sights, and feelings into intense physical waves without normal sensory filtering.",
      mind: "Having to manually analyze social codes (like mathematics) that others decode automatically, alongside intense comfort found in deep, focused special interests.",
      world: "A noisy, fast-paced society that values constant small talk, intense eye contact, and shifting social rules, which actively exhausts their sensory battery."
    },
    audioVisualMock: {
      title: "Audio Log Case #412: Sensory Saturation",
      duration: "1:58",
      description: "Assessment details concerning social camouflaging and cognitive battery depletion.",
      narrator: "Dr. Rebecca Stern, Neurodevelopmental Lead",
      transcript: "The client performs exceptionally well at their desk but reports complete collapse upon returning home. They explain that they must actively script every single greeting and nod, leaving their brain in a state of high alarm."
    },
    childhoodEnvironment: "Grew up feeling 'different' or 'broken' compared to classmates, often scolded for not making eye contact or being told they are 'too sensitive' to noises.",
    childhoodCauses: "Mimicking peers' actions early on to escape bullying and scoldings, building a flawless outer mask that hides their rich, intense inner world.",
    searchSentences: [
      "I am completely exhausted from forcing myself to make eye contact and mimic people's expressions.",
      "Noisy crowded rooms feel like physical pain, and I get severe sensory overload from loud sounds.",
      "I feel like an alien pretending to be a normal human being in every social conversation.",
      "I have highly intense special interests and feel incredibly anxious when my daily routines are broken."
    ],
    tags: ["autism", "asd", "neurodivergence", "neurodivergent", "masking", "sensory", "overload", "light", "noise", "social script", "burnout", "routines"],
    analogy: "Masking on the Autism spectrum is like translating every conversation you have into a foreign language in real-time, while trying to walk across a room where the music is deafening and strobe lights are flashing in your eyes. You have to keep a perfectly calm, polite smile on your face and never drop your notebook, or everyone will notice.",
    conversationScenario: {
      context: "Trying to join a noisy Friday lunch gathering in the busy office cafeteria with colleagues.",
      dialogue: [
        {
          speaker: "Colleague",
          speech: "Hey! Come join our table! We are talking about our weekend plans and where to get the best tacos tonight.",
          innerThought: "They've been sitting on their own a lot. I want to include them in the fun."
        },
        {
          speaker: "Person",
          speech: "Oh, tacos sound great! I actually... don't have many plans, just catching up on some quiet reading this week.",
          innerThought: "The background echoing of plates scraping is piercing through my skull. My eyes are burning from the neon lighting. Okay, keep the script running: make eye contact for 2 seconds, look down, smile, repeat."
        },
        {
          speaker: "Colleague",
          speech: "Reading? You need to come out with us and get some drinks instead! Don't be such a hermit, come have some fun!",
          innerThought: "I'm just teasing them, trying to encourage them to relax with us."
        },
        {
          speaker: "Person",
          speech: "Haha, thank you so much! I might drop by later if I can finish my chores. Let me grab my lunch tray first.",
          innerThought: "My brain is completely saturated with noise. I feel like my battery is at 1%. If I tell them I can't handle the sound of this cafeteria, they will think I'm stuck-up or weird. I need to find a dark, empty stairwell immediately just to breathe."
        }
      ]
    }
  },
  {
    id: "somatic-health-anxiety",
    query: "convinced they have a deadly disease, constant doctor visits",
    clinicalConcept: "Somatic Symptom / Health Anxiety",
    shortExplanation: "This highlights features of Somatic Symptom Disorder or Health Anxiety (formerly Hypochondriasis). This mindset causes extreme distress and worry over mild physical sensations (like a headache or twitch), leading to a terrifying conviction that they have a deadly illness.",
    outsideAction: "What people see: Constantly searching medical symptoms online, scheduling multiple doctor appointments, asking loved ones for reassurance about their body, and smelling virtual diseases everywhere.",
    insideMind: "What they actually feel: A terrifying sense of danger from within their own body. Every pulse beat, chest flutter, or skin freckle is seen as definite proof of a terminal illness. Doctors saying 'you are healthy' offers only a few hours of peace before the panic returns.",
    matchMeter: [
      { disorder: "Somatic Symptom Disorder / Health Anxiety", percentage: 95 },
      { disorder: "Generalized Anxiety Disorder (GAD)", percentage: 72 },
      { disorder: "Panic Disorder", percentage: 60 }
    ],
    triOrigin: {
      body: "The brain's self-monitoring network becomes hyper-focused on internal sensory signals, magnifying normal processes (like digestion or heartbeat) into intense physical sensations.",
      mind: "A catastrophic belief structure that 'all minor bodily flutters must represent terminal medical problems' and a high distrust of clinical negative test results.",
      world: "An era of instant search engines (cyberchondria), combined with experiencing a sudden illness of a loved one in the past, making health feel incredibly fragile."
    },
    audioVisualMock: {
      title: "Audio Log Case #211: Somatic Vigilance",
      duration: "1:42",
      description: "Assessment notes regarding multiple physiological checkups and negative diagnostic panels.",
      narrator: "Dr. Catherine Voss, Clinical Lead",
      transcript: "The patient presents with severe throat tightness and is fully convinced it is an advancing tumor. Despite three negative throat scopes from specialists, they spend five hours daily checking their neck in the mirror and searching symptoms."
    },
    childhoodEnvironment: "Grew up in a family that overreacted to any cough or cold, or with a family member who was chronically ill, making health seem easily lost.",
    childhoodCauses: "Learning that minor physical cues are precursors to extreme diagnostic tragedies, developing hyper-vigilance to intercept disease early.",
    searchSentences: [
      "I am absolutely convinced I have a deadly disease even though my doctors say I am healthy.",
      "I keep searching throat tightness and stomach twitches online for hours, panicking.",
      "I check my pulse, temperature, and skin moles constantly to search for signs of terminal illness.",
      "I go to multiple doctors and get blood tests, but I still worry that they missed my cancer."
    ],
    tags: ["disease", "syndrome", "health anxiety", "doctor", "symptoms", "cancer", "tumor", "googling", "pulse", "cyberchondria", "illness", "somatic"],
    analogy: "Health anxiety is like having a microscope glued directly to your eye. Every tiny, harmless speck of dust on your skin looks like a giant, terrifying monster. You cannot see the rest of the room where you are completely safe; you only see the magnified dust and panic.",
    conversationScenario: {
      context: "Discussing a minor headache over dinner with a spouse on Tuesday evening.",
      dialogue: [
        {
          speaker: "Spouse",
          speech: "Are you okay, sweetheart? You've been rubbing your temples and looking at your phone for the last twenty minutes.",
          innerThought: "I hope it's just a long day at the desk. I want us to enjoy our dinner together."
        },
        {
          speaker: "Person",
          speech: "I have this weird, sharp twinge on the left side of my head. I looked it up just now, and it says a sharp localized pain can be an early warning signs of an aneurysm or a brain tumor.",
          innerThought: "My head flutters again. It's so intense! What if a blood vessel is literally about to burst right now? The doctor is closed. If I don't go to the ER, I might not wake up tomorrow."
        },
        {
          speaker: "Spouse",
          speech: "But sweetie, you had a full head MRI last year and the neurologist said your brain is completely clear! You've also been staring at a computer screen for nine hours straight today.",
          innerThought: "They got so thoroughly checked last year. I need to reassure them that screen strain is incredibly common."
        },
        {
          speaker: "Person",
          speech: "But that MRI was last year! Things can grow so quickly in twelve months. And this feels different, it's not a normal screen lag tension. I really think I should get a secondary referral or visit the urgent walk-in clinic tonight.",
          innerThought: "They don't understand. They are being so casual, but I am living in a state of absolute terror. My body is a ticking time bomb, and I can't trust anyone who tells me to just ignore it."
        }
      ]
    }
  },
  {
    id: "avoidant-attachment",
    query: "pushes people away when they get close, fear of intimacy",
    clinicalConcept: "Avoidant Attachment Style (Dismissive-Avoidant)",
    shortExplanation: "This aligns with an Avoidant (or Dismissive-Avoidant) Attachment Style. It is an protective relational defense mechanism where an individual maintains intense self-reliance and emotional distance to protect themselves from potential rejection, control, or loss of independence.",
    outsideAction: "What people see: Backing away from close friendships or relationships as things get deep, failing to reply to intimate messages, presenting as emotionally unavailable or self-absorbed, and prioritizing hobbies or career over connections.",
    insideMind: "What they actually feel: A sudden, suffocating feeling of confinement when someone gets too close or expresses high dependence. Safe self-sufficiency tells them that needing other people is a critical danger that leads to hurt and disappointment.",
    matchMeter: [
      { disorder: "Insecure Attachment Style (Avoidant)", percentage: 95 },
      { disorder: "Social Anxiety Disorder", percentage: 48 },
      { disorder: "Anxious-Avoidant (Ambivalent) Transitions", percentage: 35 }
    ],
    triOrigin: {
      body: "An over-aroused autonomic system that associates close emotional vulnerability with deep-seated threat signals instead of safety and comfort.",
      mind: "A rigid defensive rule: 'Only I can protect myself; to need anyone else is to invite agony and loss of control.' Subconscious cognitive systems work to neutralize intimacy bids.",
      world: "Growing up under caregivers who ignored, mocked, or rejected emotional expressions like crying or clinging, forcing premature emotional self-sufficiency."
    },
    audioVisualMock: {
      title: "Audio Log Case #703: Relational Withdrawal",
      duration: "2:04",
      description: "Anonymized session detailing the use of deactivating strategies during healthy bonding milestones.",
      narrator: "Dr. Catherine Voss, Clinical Lead",
      transcript: "As soon as their partner suggested moving in together, the client reported completely losing their romantic interest and feeling stifled. They began magnifying very minor flaws in their partner to justify pulling away, which acts as a subconscious deactivating strategy to restore safety through isolation."
    },
    childhoodEnvironment: "Raised in an environment where display of distress, sad face, or soft needs was met with anger, dismissal, or pressure to keep quiet and handle it themselves.",
    childhoodCauses: "Learning that bids for protective care bring coldness or active avoidance from caregivers, forcing the young child to rely strictly on their own cognitive control.",
    searchSentences: [
      "I always push people away when they get emotionally close to me and start caring.",
      "I feel like I am suffocating or getting trapped when someone relies on me in relationships.",
      "I tend to pull back and go cold as soon as our relationship starts to get real and serious.",
      "I tell myself I'm happier alone and that romantic bonds are just painful, demanding cages."
    ],
    tags: ["avoidant", "attachment", "intimacy", "closeness", "pushing", "cold", "independent", "unavailable", "romantic", "withdrawing", "bonding", "distancing"],
    analogy: "An avoidant attachment style is like living in a beautiful stone fortress with the drawbridge permanently raised. When someone approaches with warm bread and a lantern, asking to be let in, your watchtower alarms panic and interpret it as a siege. Instead of opening the gate, you fire warning arrows to keep them at a distance, safely preserving your territory.",
    conversationScenario: {
      context: "Discussing the next steps after eighteen months of healthy dating over dinner.",
      dialogue: [
        {
          speaker: "Partner",
          speech: "I spent hours looking at local real estate listings today! If we move in together, we can save so much rent and afford a lovely place with a garden. What do you think?",
          innerThought: "We have been together for almost two years, and I really want to share a home with them."
        },
        {
          speaker: "Person",
          speech: "A garden? Oh. I haven't really thought about it. My current apartment lease is super strict about subletting anyway, and my work project has been incredibly demanding lately.",
          innerThought: "My heart is instantly hammering. Moving in means they'll see me every single hour of the day. My private sanctuary is going to vanish. What if they notice all my flaws and throw me away? I need to build a barrier."
        },
        {
          speaker: "Partner",
          speech: "But you've been talking about getting out of that apartment for months! We agreed last weekend this was our next steps. Why do you look so distant all of a sudden?",
          innerThought: "They are withdrawing again. Every single time we get close to a milestone, they build a massive wall."
        },
        {
          speaker: "Person",
          speech: "I'm just being realistic. I think we are rushing things. I value my independence a lot, and I don't want us to ruin what we have by making hasty choices.",
          innerThought: "I can see the raw disappointment on their face, and I hate myself for it. But the urge to escape this table, go home, and lock my front door is so scream-loud that I can barely think."
        }
      ]
    }
  },
  {
    id: "anxious-attachment",
    query: "constantly worried partner will leave, need reassurance in relationships",
    clinicalConcept: "Anxious Attachment Style (Anxious-Preoccupied)",
    shortExplanation: "This aligns with an Anxious Attachment Style. In this pattern, individuals experience heightened sensitivity to any signals of distance, silence, or rejection in close relationships, leading to persistent fear of abandonment and a constant, burning need for emotional closeness and validator reassurance.",
    outsideAction: "What people see: Sending a burst of messages if someone doesn't reply quickly, constantly asking 'Is everything okay between us?', over-interpreting minor shifts in facial tone, and feeling deeply hollow or hyper-aroused when alone.",
    insideMind: "What they actually feel: A chronic, painful humming that they are unlovable and about to be replaced. Any quiet gap or busy tone from their partner feels like safe proof of declining interest, causing severe physical panic that demands instant connection.",
    matchMeter: [
      { disorder: "Insecure Attachment Style (Anxious)", percentage: 95 },
      { disorder: "Borderline Personality Traits (Rejection sensitivity)", percentage: 52 },
      { disorder: "Generalized Anxiety Disorder (GAD)", percentage: 45 }
    ],
    triOrigin: {
      body: "A hyper-vigilant connection-threat network that triggers immediate adrenaline flushes (racing heart, stomach drop) at any perceived drop in social warmth.",
      mind: "A strong cognitive scanner that interprets tired sighs, neutral expressions, or short texts as active, catastrophic signs of fading love or silent resentment.",
      world: "Growing up with caregivers whose attention and warmth were highly unstable or unpredictable—sometimes intensely loving, other times deeply preoccupied or cold."
    },
    audioVisualMock: {
      title: "Audio Log Case #711: Reassurance Vigilance",
      duration: "1:52",
      description: "Anonymized clinic notes regarding texting behavior and separation panic waves.",
      narrator: "Dr. Catherine Voss, Clinical Lead",
      transcript: "When their partner went out for a casual dinner with coworkers, the client sent sixteen texts, escalating from warm queries to intense panic and accusations. The patient reports experiencing a physical sense of 'dissolving' under silence, explaining that seeking immediate reassurance is the only way to establish their basic existence."
    },
    childhoodEnvironment: "Raised by caretakers whose availability was highly inconsistent, teaching the child that their needs would only be met if they amplified their emotional signals.",
    childhoodCauses: "Learning early that silent waiting means being forgotten, turning normal attachment requests into hyper-active monitoring systems to keep love close.",
    searchSentences: [
      "I get severe chest anxiety when my partner takes hours to reply to my messages.",
      "I am constantly terrified that the people I love are going to get bored of me and walk away.",
      "I need constant, repetitive verbal reassurance to believe that my partner actually still loves me.",
      "I completely over-analyze my partner's tired face or passive behavior, thinking I did something wrong."
    ],
    tags: ["anxious", "attachment", "reassurance", "abandonment", "clinging", "relationships", "texting", "monitoring", "overthinking", "love", "scared", "abandoned"],
    analogy: "An anxious attachment style is like living with an incredibly sensitive smoke detector inside your heart that is tuned specifically for temperature drops. If your partner is quiet, overworked, or slightly tired, the alarm goes off shouting 'They are leaving! Panic!'—forcing you to reach out and seek reassurance to prove your entire emotional world hasn't burned down.",
    conversationScenario: {
      context: "A partner returns home from an extremely heavy, exhausting workday and collapses onto the couch.",
      dialogue: [
        {
          speaker: "Partner",
          speech: "[Stretches out and sighs heavily] Gosh, what an absolutely exhausting day. I'm completely wiped out.",
          innerThought: "I just need fifteen minutes of complete quiet and silence to let my brain rest after all those difficult client tasks."
        },
        {
          speaker: "Person",
          speech: "Oh, is everything alright? You... didn't write anything back to my message this afternoon. Are you upset about something I did?",
          innerThought: "They didn't even smile when they walked in, and they sighed so deeply. They didn't come kiss me. Oh no, they have been thinking about leaving me all afternoon, haven't they? That's why they were silent."
        },
        {
          speaker: "Partner",
          speech: "No, honey, I am genuinely just tired. It has nothing to do with you at all. I had to deal with server crashes and unhappy clients since 8 AM.",
          innerThought: "I've explained I'm just tired, but why must every exhausted sigh be interpreted as a relationship crisis? I don't have the fuel to carry this conversation right now."
        },
        {
          speaker: "Person",
          speech: "But you feel so distant... if you need space or don't want to talk to me, just let me know. I hate feeling like I'm a chore or a burden to you.",
          innerThought: "They are saying it's fine, but their voice is so flat. I just need them to hold me of look me in the eyes and tell me we are safe, or my mind will spin with terror all night."
        }
      ]
    }
  },
  {
    id: "schizophrenia-spectrum",
    query: "hears voices or feels people are watching, flat emotions and disorganized thoughts",
    clinicalConcept: "Schizophrenia Spectrum & Psychotic Symptoms",
    shortExplanation: "This indicates symptoms associated with Schizophrenia, where the brain struggles to filter out background neural noise. This makes it hard to distinguish between inside thoughts, memory echoes, and outside reality, sometimes leading to hearing voices or feeling highly watched.",
    outsideAction: "What people see: Talking or responding to empty space, sudden expressions of fear or suspicion towards safe people, monotone speech patterns, and using disorganized or unusual words.",
    insideMind: "What they actually feel: A noisy, crowded sensory room. Hearing distinct voices or chatter that sound completely real, and feeling a deep, terrifying certainty that there are secret observers or threats nearby.",
    matchMeter: [
      { disorder: "Schizophrenia Spectrum", percentage: 95 },
      { disorder: "Schizoaffective Disorder", percentage: 75 },
      { disorder: "Major Depression with Psychotic Features", percentage: 40 }
    ],
    triOrigin: {
      body: "Arises from altered dopamine and glutamate signaling pathways in the brain. Genetic factors make visual/auditory signal filters more sensitive.",
      mind: "The brain's self-monitoring center misattributes internally generated self-talk or memory clips as outside, physical voices.",
      world: "Can be sparked in genetically vulnerable people by high emotional stress, severe circadian disruption, trauma, or active substance use."
    },
    audioVisualMock: {
      title: "Audio Log Case #612: Perceptual Noise Exposure",
      duration: "2:08",
      description: "Excerpts from clinical session on sensory boundaries and noise filtering.",
      narrator: "Dr. Julian Sterling, Psychosis Research Director",
      transcript: "The student explains that thoughts do not stay inside their mind. It feels like they are being spoken by other entities in the room. They know others cannot see these entities, but the sound waves feel physically real in their ears."
    },
    childhoodEnvironment: "A complex combination of genetic vulnerability, exposure to severe early life stress, or chemical changes that impact early signal processing.",
    childhoodCauses: "Developing hyper-vigilance toward environmental threats as a core biological adaptation, where the cognitive filter slowly fails to separate thoughts from external sounds.",
    searchSentences: [
      "I am hearing faint whispers or voices in my room when no one is there.",
      "I feel a terrifying certainty that people are secret-monitoring or watching me.",
      "My thoughts are extremely disorganized and my words sound strange to others.",
      "I feel disconnected from reality and feel like my food or space might be unsafe."
    ],
    tags: ["schiz", "schizophrenia", "voices", "hears", "watched", "paranoid", "psychosis", "flat", "disorganized", "whispers", "shadows"],
    analogy: "Think of Schizophrenia like trying to listen to a single quiet radio station while your tuner dial is stuck between three stations at once, with background static roaring and the volume knob turned up too high. You cannot turn off the radio, and the static starts to sound like meaningful secrets.",
    conversationScenario: {
      context: "A family member is preparing lunch while they feel highly suspicious of the ingredients and hear whispering.",
      dialogue: [
        {
          speaker: "Family Member",
          speech: "I'm making some vegetable pasta for us. Do you want me to add the secret Italian spices on your portion?",
          innerThought: "They haven't eaten properly all day. They've been staring at the corner of the room."
        },
        {
          speaker: "Person",
          speech: "Where... where did you buy that spice bottle from? Who told you to use that specific brand today?",
          innerThought: "The faint whisper in the corner just said 'Don't eat it, it's a trap.' Their kitchen knife is lying on the table... Are they working with the observers?"
        },
        {
          speaker: "Family Member",
          speech: "Wait, what? I bought it from the convenience store yesterday. It's the same brand we always buy. Are you feeling okay?",
          innerThought: "They sound so suspicious and guarded. I want to keep things calm."
        },
        {
          speaker: "Person",
          speech: "I can... hear them talking in the hallway. They are saying you are going to change the ingredients. Please don't open that bottle. Let me open a fresh can myself.",
          innerThought: "They think I am acting crazy, but the voices are so loud and confident it's terrifying. I need to make sure my food is 100% safe to quiet the noise in my head."
        }
      ]
    }
  },
  {
    id: "antisocial-pd",
    query: "breaks rules, shows no remorse, manipulates others for personal gain",
    clinicalConcept: "Antisocial Personality Disorder (ASPD)",
    shortExplanation: "This indicates features of Antisocial Personality Disorder (ASPD), where the brain's emotional threat and empathy networks function differently. This leads to a persistent difficulty following social rules, high impulsivity, sensation-seeking, and showing minimal remorse or concern for others' rights.",
    outsideAction: "What people see: Frequent rule-breaking or legal issues, lying or manipulating others for personal benefit, acting aggressively when challenged, and quickly abandoning commitments without guilt.",
    insideMind: "What they actually feel: A flat, low-adrenaline baseline that feels boring and dead. To feel alive, they seek quick sensation, risk, and control. Other people's emotional reactions or tears look like mechanical actions rather than feelings they can share.",
    matchMeter: [
      { disorder: "Antisocial Personality Disorder (ASPD)", percentage: 95 },
      { disorder: "Conduct Disorder (History)", percentage: 80 },
      { disorder: "Borderline Personality Traits (Impulsivity)", percentage: 45 }
    ],
    triOrigin: {
      body: "A strongly under-reactive autonomic nervous system (low resting heart rate) that requires extreme sensations or risks to feel stimulation. Low amygdala reaction to fear cues.",
      mind: "A cognitive strategy that views the world as 'exploiters vs. the exploited,' leading to a belief that manipulating others is necessary for survival.",
      world: "Deeply associated with developmental trauma, inconsistent parenting, early childhood abuse, or neglect that forced the child to rely strictly on raw self-preservation."
    },
    audioVisualMock: {
      title: "Audio Log Case #441: Baseline De-escalation",
      duration: "1:45",
      description: "Notes regarding risk-seeking behaviors and flat empathy response tracking.",
      narrator: "Dr. Marcus Vance, Forensic Psychology Lead",
      transcript: "The patient describes feeling zero sweat or racing heart when taking high-risk actions. While they understand intellectually that their actions cause financial or emotional harm to others, their emotional nervous system stays completely flat and silent."
    },
    childhoodEnvironment: "Growing up in hostile, abusive, or extremely neglectful settings where safety did not exist and they learned that only the strongest or most manipulative survive.",
    childhoodCauses: "Developing an emotional protective block to shut down vulnerable feelings like fear or empathy, replacing them with a drive for power and control.",
    searchSentences: [
      "I don't feel bad or show remorse after breaking rules or hurting others' feelings.",
      "I constantly manipulate and lie to get what I want without feeling guilty.",
      "The rules of society feel stupid and boring, and I seek intense risk and thrilling action.",
      "Other people's tears or emotional distress feel completely fake or useless to me."
    ],
    tags: ["remorse", "manipulate", "rules", "antisocial", "aspd", "impulsive", "lying", "charm", "risk", "anger", "sociopathy", "psychopathy", "remorseless"],
    analogy: "ASPD is like driving a high-speed vehicle with a completely broken warning-light panel and no brakes for empathy. While others feel a warm emotional pull of shame, fear, or guilt that stops them from hurting people, your dashboard reads completely cold, viewing social rules as mere speed bumps to bypass.",
    conversationScenario: {
      context: "A coworker confronts them about taking praise and credit for a project they did not actually work on.",
      dialogue: [
        {
          speaker: "Coworker",
          speech: "You told the boss you did the entire database migration yourself! I stayed up till 3 AM writing that code, and you didn't even mention my name!",
          innerThought: "I can't believe they did this with a straight face. They took all the bonus credit and glory."
        },
        {
          speaker: "Person",
          speech: "Look, the boss wanted results and I delivered the presentation perfectly. If you wanted the credit, you should have stood up and presented it yourself.",
          innerThought: "Why are they crying about minor credit? In this company, those who speak best win. It's their fault for being too passive and soft."
        },
        {
          speaker: "Coworker",
          speech: "That is completely dishonest and unfair! We had a clear deal! Does our friendship and teamwork mean absolutely nothing to you?",
          innerThought: "They look completely unbothered, like they are looking at a fly's buzz. It's chilling."
        },
        {
          speaker: "Person",
          speech: "Business is about winning, not deals. If you want to make a big scene, go ahead, but the boss is happy with me. Just let it go and write the next code better.",
          innerThought: "They look so angry. It's actually a bit amusing how easily people get worked up over trivial things. I got my bonus, and that's all that matters to me."
        }
      ]
    }
  },
  {
    id: "substance-addiction",
    query: "craves drugs or alcohol, gets anxious or shaky during withdrawal, uses to escape life",
    clinicalConcept: "Substance Use Disorder (Drug Addiction)",
    shortExplanation: "This indicates symptoms of Substance Use Disorder, where the brain's reward circuits are re-wired by chemical triggers. The brain begins to treat the substance as an essential need like water or food, causing intense cravings and painful physical symptoms when stopping.",
    outsideAction: "What people see: Changes in social circles, sudden energy ups and downs, sweating or shaking when sober, neglecting family or school commitments, and secretive behavior.",
    insideMind: "What they actually feel: A constant, burning voice that says 'I cannot handle life without it.' Underneath is deep shame, fear of the agonizing withdrawal symptoms, and feeling that normal, sober activities are completely grey and empty.",
    matchMeter: [
      { disorder: "Substance Use Disorder", percentage: 95 },
      { disorder: "Major Depressive Disorder (MDD)", percentage: 65 },
      { disorder: "Generalized Anxiety Disorder (GAD)", percentage: 55 }
    ],
    triOrigin: {
      body: "The brain's dopamine pathways get flooded by drug usage, desensitizing normal receptors. When sober, natural dopamine states collapse, sparking heavy physical distress.",
      mind: "Using the substance as an automatic chemical escape valve to instantly turn off emotional pain, stress, shame, or cognitive loops.",
      world: "Starting in social circles with high drug availability, family pattern histories of addiction, or severe chronic stress where safe coping options were absent."
    },
    audioVisualMock: {
      title: "Audio Log Case #302: Withdrawal Spike",
      duration: "1:50",
      description: "Notes regarding physical tremor habits and coping triggers.",
      narrator: "Dr. Linda Lawson, Addiction Rehabilitation Director",
      transcript: "The client exhibits minor hand tremors and rapid breathing during the intake interview. They describe their craving like a physical wave of water holding them underwater. They feel they will drown if they do not find immediate relief."
    },
    childhoodEnvironment: "Growing up in households with active substance abuse modeling, unaddressed developmental trauma, or high instability where they lacked emotional self-regulation training.",
    childhoodCauses: "Discovering early that chemical substances could instantly mute emotional pain or feelings of isolation, establishing a hardcoded detour around natural coping.",
    searchSentences: [
      "I get extremely anxious, shaky, and sweat when I stop using drugs or alcohol.",
      "All I can focus on is getting the next dose to stop the burning craving.",
      "I keep using substances even though it is completely ruining my relationships and school.",
      "I feel deeply empty and dead inside when I am sober, like nothing can make me happy."
    ],
    tags: ["craving", "drugs", "alcohol", "addiction", "withdrawal", "shaky", "sweat", "tolerance", "relapse", "substance", "drinking", "pills", "weed", "cocaine", "heroin", "drug", "substances"],
    analogy: "Drug addiction is like a hostile parasite hijacking your brain's fuel system. It wires your dashboard so that the 'empty gas tank' light is constantly screaming red when you are sober, convincing your primal mind that you will literally starve or freeze to death unless you feed the parasite immediately.",
    conversationScenario: {
      context: "A close friend confronts them about missing their final semester exam because of a substance bender the night before.",
      dialogue: [
        {
          speaker: "Friend",
          speech: "You missed our final exam this morning! We've been studying for three weeks! I came to your room and it smelled like smoke and empty bottles. What are you doing with your life?",
          innerThought: "I'm terrified for them. They are throwing away their clinical degree. They look so shaky and exhausted."
        },
        {
          speaker: "Person",
          speech: "I... I overslept. My alarm didn't go off. It's not a big deal, I can just write a make-up exam or ask for a medical note.",
          innerThought: "My stomach is twisting. My hands are shaking under the blanket. I can't think about the exam. If they keep shouting, my head will split. I just need them to leave so I can take something to feel normal."
        },
        {
          speaker: "Friend",
          speech: "Overslept? Your face is grey, your hands are shaking, and you look like you can barely stand up! You've been lying to me for weeks about stopping!",
          innerThought: "I can see the raw panic in their eyes. They are drowning and lying to protect their habit."
        },
        {
          speaker: "Person",
          speech: "Please, just stop yelling! You don't know how hard it is... I was having severe muscle pain last night and I couldn't sleep at all. I did it just to stop the pain. I have it under control, I promise.",
          innerThought: "I feel so disgustingly ashamed. I didn't want to miss the exam. But when the sweating started last night, the panic was so incredibly violent I couldn't breathe. I hate myself for this, but I couldn't stop."
        }
      ]
    }
  }
];

export function findMatchingBehavior(query: string): BehaviorResult | null {
  const norm = query.toLowerCase().trim();
  if (!norm) return null;

  // Exact Match Check
  const exact = PREDEFINED_BEHAVIORS.find(
    b => b.query.toLowerCase() === norm || 
         b.clinicalConcept.toLowerCase() === norm || 
         b.id.toLowerCase() === norm
  );
  if (exact) return exact;

  // Let's implement an improved scored matching algorithm!
  let bestMatch: BehaviorResult | null = null;
  let highestScore = 0;

  const stopWords = new Set([
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", 
    "he", "she", "it", "they", "them", "what", "which", "who", "whom", "this", "that", 
    "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", 
    "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", 
    "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", 
    "with", "about", "against", "between", "into", "through", "during", "before", 
    "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", 
    "over", "under", "again", "further", "then", "once", "here", "there", "when", 
    "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", 
    "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", 
    "too", "very", "can", "will", "just", "should", "now", "feel", "feels", "feeling", 
    "always", "sometimes", "constantly", "continuously", "relentlessly", "like", "happen", "happens"
  ]);

  const queryTokens = norm.split(/[^a-z0-9]/).filter(t => t.length > 1 && !stopWords.has(t));

  for (const item of PREDEFINED_BEHAVIORS) {
    let score = 0;

    // Substring contains
    if (item.clinicalConcept.toLowerCase().includes(norm) || item.id.toLowerCase().includes(norm)) {
      score += 250;
    }
    if (item.query.toLowerCase().includes(norm)) {
      score += 180;
    }

    // Direct tag match boosts
    if (item.tags) {
      for (const tag of item.tags) {
        if (norm.includes(tag.toLowerCase())) {
          score += 60;
        }
        for (const token of queryTokens) {
          if (tag.toLowerCase() === token) {
            score += 50;
          }
        }
      }
    }

    // Direct searchSentences match boosts
    if (item.searchSentences) {
      for (const sentence of item.searchSentences) {
        const senLower = sentence.toLowerCase();
        if (senLower.includes(norm) || norm.includes(senLower)) {
          score += 100;
        }
        
        // Count matching cognitive tokens
        const sentenceTokens = senLower.split(/[^a-z0-9]/).filter(t => t.length > 1 && !stopWords.has(t));
        const intersection = queryTokens.filter(t => sentenceTokens.includes(t));
        score += intersection.length * 35;
      }
    }

    const triggerTokens = item.query.toLowerCase().split(/[^a-z0-9]/).filter(t => t.length > 1 && !stopWords.has(t));
    const triggerIntersection = queryTokens.filter(t => triggerTokens.includes(t));
    score += triggerIntersection.length * 40;

    if (score > highestScore && score > 0) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // High confidence threshold
  if (bestMatch && highestScore >= 20) {
    return bestMatch;
  }

  // Backup simple keyword mappings for failsafe
  if (norm.includes("clean") || norm.includes("wash") || norm.includes("soap") || norm.includes("germ") || norm.includes("ocd") || norm.includes("contam") || norm.includes("compulsive") || norm.includes("scrub") || norm.includes("ritual") || norm.includes("sink") || norm.includes("checking") || norm.includes("hands") || norm.includes("hand-wash")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "ocd-hands") || null; 
  }
  if (norm.includes("house") || norm.includes("outside") || norm.includes("leave") || norm.includes("agor") || norm.includes("open") || norm.includes("mall") || norm.includes("crowd") || norm.includes("faint") || norm.includes("escap") || norm.includes("trapped")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "agoraphobia-house") || null; 
  }
  if (norm.includes("focus") || norm.includes("lose") || norm.includes("key") || norm.includes("adhd") || norm.includes("attention") || norm.includes("distract") || norm.includes("hyperactive") || norm.includes("lost") || norm.includes("forget") || norm.includes("scattered") || norm.includes("concentrate")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "adhd-focus") || null;
  }
  if (norm.includes("outside body") || norm.includes("mirror") || norm.includes("unreal") || norm.includes("movie") || norm.includes("detached") || norm.includes("dpdr") || norm.includes("depersonal") || norm.includes("dereal") || norm.includes("robot") || norm.includes("dream") || norm.includes("simulation") || norm.includes("puppet")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "depersonalization-unreal") || null; 
  }
  if (norm.includes("panic") || norm.includes("chest") || norm.includes("heart") || norm.includes("dying") || norm.includes("terror") || norm.includes("adrenaline") || norm.includes("gasp") || norm.includes("breathless") || norm.includes("stroke") || norm.includes("shak") || norm.includes("sweat")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "panic-attack") || null; 
  }
  if (norm.includes("meal") || norm.includes("skip") || norm.includes("calor") || norm.includes("eat") || norm.includes("weight") || norm.includes("fat") || norm.includes("anorex") || norm.includes("diet") || norm.includes("restrict") || norm.includes("bulimia") || norm.includes("food") || norm.includes("scale") || norm.includes("guilt")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "eating-disorder") || null; 
  }
  if (norm.includes("social") || norm.includes("speak") || norm.includes("stranger") || norm.includes("presentation") || norm.includes("scared") || norm.includes("shyness") || norm.includes("shy") || norm.includes("public") || norm.includes("stage") || norm.includes("spotlight") || norm.includes("sweat") || norm.includes("judge") || norm.includes("embarrass")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "social-phobia") || null; 
  }
  if (norm.includes("worry") || norm.includes("gad") || norm.includes("continuous") || norm.includes("tense") || norm.includes("nervous") || norm.includes("anxious") || norm.includes("tension") || norm.includes("muscle") || norm.includes("what-if") || norm.includes("restless") || norm.includes("uncertain")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "generalized-anxiety") || null;
  }
  if (norm.includes("sad") || norm.includes("empty") || norm.includes("bed") || norm.includes("energy") || norm.includes("depress") || norm.includes("unmotivated") || norm.includes("hopeless") || norm.includes("mdd") || norm.includes("numb") || norm.includes("crying") || norm.includes("exhaustion")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "major-depression") || null;
  }
  if (norm.includes("relive") || norm.includes("past") || norm.includes("nightmare") || norm.includes("flashback") || norm.includes("startle") || norm.includes("trauma") || norm.includes("ptsd") || norm.includes("jumpy") || norm.includes("abuse") || norm.includes("accident") || norm.includes("trigger")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "ptsd-trauma") || null;
  }
  if (norm.includes("abandon") || norm.includes("mood swings") || norm.includes("borderline") || norm.includes("bpd") || norm.includes("splitting") || norm.includes("friendship") || norm.includes("conflict") || norm.includes("clingy") || norm.includes("rejection")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "borderline-instability") || null;
  }
  if (norm.includes("bipolar") || norm.includes("crash") || norm.includes("high energy") || norm.includes("euphoria") || norm.includes("mania") || norm.includes("manic") || norm.includes("oscillat") || norm.includes("circadian") || norm.includes("cycle")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "bipolar-oscillations") || null;
  }
  if (norm.includes("sleep") || norm.includes("insomnia") || norm.includes("awake") || norm.includes("toss") || norm.includes("pillow") || norm.includes("night") || norm.includes("turning") || norm.includes("tired") || norm.includes("bed") || norm.includes("nocturnal")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "insomnia-sleep") || null;
  }
  if (norm.includes("narcissist") || norm.includes("narcissism") || norm.includes("npd") || norm.includes("ego") || norm.includes("criticism") || norm.includes("grandiosity") || norm.includes("superior") || norm.includes("admire") || norm.includes("admiration") || norm.includes("feedback") || norm.includes("fragile") || norm.includes("shame")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "narcissistic-vulnerability") || null;
  }
  if (norm.includes("autism") || norm.includes("asd") || norm.includes("neurodivergent") || norm.includes("neurodivergence") || norm.includes("masking") || norm.includes("sensory") || norm.includes("overload") || norm.includes("light") || norm.includes("noise") || norm.includes("routine") || norm.includes("special interest")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "autism-masking") || null;
  }
  if (norm.includes("somatic") || norm.includes("health anxiety") || norm.includes("hypochondria") || norm.includes("disease") || norm.includes("doctor") || norm.includes("illness") || norm.includes("symptoms") || norm.includes("cancer") || norm.includes("tumor") || norm.includes("googling") || norm.includes("cyberchondria") || norm.includes("pulse")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "somatic-health-anxiety") || null;
  }
  if (norm.includes("avoidant") || norm.includes("intimacy") || norm.includes("push away") || norm.includes("dismissive") || norm.includes("emotionally unavailable")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "avoidant-attachment") || null;
  }
  if (norm.includes("anxious attachment") || norm.includes("clinging") || norm.includes("abandonment") || norm.includes("reassurance") || norm.includes("texting") || norm.includes("preoccupied")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "anxious-attachment") || null;
  }
  if (norm.includes("schiz") || norm.includes("voices") || norm.includes("hallucin") || norm.includes("watched") || norm.includes("paranoid") || norm.includes("psychosis") || norm.includes("observe")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "schizophrenia-spectrum") || null;
  }
  if (norm.includes("antisocial") || norm.includes("aspd") || norm.includes("remorse") || norm.includes("manipulat") || norm.includes("breaks rules") || norm.includes("sociopath") || norm.includes("psychopath")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "antisocial-pd") || null;
  }
  if (norm.includes("drug") || norm.includes("addict") || norm.includes("substance") || norm.includes("craving") || norm.includes("withdrawal") || norm.includes("alcohol") || norm.includes("drinking") || norm.includes("bender")) {
    return PREDEFINED_BEHAVIORS.find(b => b.id === "substance-addiction") || null;
  }

  return null;
}
