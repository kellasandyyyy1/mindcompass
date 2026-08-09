import { BehaviorResult, ConversationScenario } from "../types";

// Handcrafted real-life dialogues across three key social dimensions for core conditions
const HANDCRAFTED_SCENARIOS: Record<
  string,
  { friend: ConversationScenario; family: ConversationScenario; couple: ConversationScenario }
> = {
  "ocd-hands": {
    friend: {
      context: "A close friend notices they have raw, dry knuckles and refuse to share popcorn from a single shared bucket during a casual movie night.",
      dialogue: [
        {
          speaker: "Friend",
          speech: "Hey, do you want some popcorn? I'm holding the bucket.",
          innerThought: "They look so tense staring at my hands on the bowl."
        },
        {
          speaker: "Sufferer",
          speech: "No, thank you! I'm totally good. My hands are actually a little sensitised right now.",
          innerThought: "They just touched the remote, their phone, and the couch. If I reach into that bowl, my mind will scream about germ transfer. I just washed my hands to a raw state—I can't go back to the bathroom again."
        },
        {
          speaker: "Friend",
          speech: "Are you sure? Also, I couldn't help but notice your knuckles are bleed-red and dry. Is everything okay?",
          innerThought: "I'm worried. They've washed their hands three times since I arrived an hour ago."
        },
        {
          speaker: "Sufferer",
          speech: "Yes! Just dry skin from the cold weather. I promised myself I'd apply some healing cream tonight.",
          innerThought: "I feel so embarrassed. It's not the weather. I washed my hands ten times today already. I don't want them to judge me or think I am completely ridiculous."
        }
      ]
    },
    family: {
      context: "A parent notices them scrubbing their hands for over ten minutes with boiling hot water, hurting their skin.",
      dialogue: [
        {
          speaker: "Parent",
          speech: "Sweetheart, why are you scrubbing your hands with such hot water? Your skin is already peeling.",
          innerThought: "It breaks my heart to see them stand at the sink for this long. They look exhausted."
        },
        {
          speaker: "Sufferer",
          speech: "I just need to make sure the external germs and grease are completely gone, Mom. It's fine, I'm almost done.",
          innerThought: "She doesn't get it. If I don't scrub with this heat, the invisible layers of bacteria won't dissolve. I might touch the baby's bottle or your mugs and make everyone deathly sick. It's my job to prevent that."
        },
        {
          speaker: "Parent",
          speech: "But you've been in here for ten minutes now. The soap is already washed away.",
          innerThought: "I want to help them, but I don't know how to stop this repeating cycle."
        },
        {
          speaker: "Sufferer",
          speech: "Just one more rinse, I promise. Please don't watch me, it makes me feel rushed and I lose count.",
          innerThought: "I know it is physically clean, but the thought won't leave. If I stop before the alarm in my head stops ringing, something terrible will happen and it will be entirely my fault."
        }
      ]
    },
    couple: {
      context: "Their partner wants to hold hands during an evening walk, but they tense up and pull away immediately.",
      dialogue: [
        {
          speaker: "Partner",
          speech: "It's so beautiful outside tonight. Let's hold hands.",
          innerThought: "I want to feel close to them, but they feel miles away."
        },
        {
          speaker: "Sufferer",
          speech: "Wait! Sorry, my hands are... really sweaty and rough right now. Let's just walk next to each other.",
          innerThought: "They just opened the public car door with those hands. If we touch, the car door contaminants will transfer directly to my skin, and I won't be able to wash them for hours. The sheer anxiety is paralyzing."
        },
        {
          speaker: "Partner",
          speech: "You've been pulling away from me a lot lately. Is there something going on between us?",
          innerThought: "Did I do something wrong? Are they losing interest in me?"
        },
        {
          speaker: "Sufferer",
          speech: "I love you so much, it's not you at all. I have this overwhelming fear of sticky surfaces and touch right now. I promise I'm trying to work through it.",
          innerThought: "I feel like a horrible partner. They think I don't love them. I want to hold their hand more than anything, but the alarms inside are screaming so loud."
        }
      ]
    }
  },
  "agoraphobia-house": {
    friend: {
      context: "A close friend has booked a table for a high-intensity birthday dinner at a crowded restaurant downtown.",
      dialogue: [
        {
          speaker: "Friend",
          speech: "We booked the table for Friday! You're finally coming, right? No excuses this time!",
          innerThought: "They've cancelled the last few times. I really hope they don't flake on my birthday."
        },
        {
          speaker: "Sufferer",
          speech: "Ah, Friday is tough for me! I have this massive project deadline that might run late into the night.",
          innerThought: "I can't tell them that the thought of an underground restaurant with no clear exit makes me feel like I am suffocating. If I get a panic attack there, I won't be able to escape."
        },
        {
          speaker: "Friend",
          speech: "We can move the reservation earlier, or we can pick you up! We really miss having you around.",
          innerThought: "They are isolating themselves. I want to make it as easy as possible for them to join."
        },
        {
          speaker: "Sufferer",
          speech: "I'm so sorry! I really want to see you. Can we do a quiet park walk or a home visit instead? It would be so much easier for me.",
          innerThought: "I feel like a terrible friend. I want to celebrate with them, but my body screams that outside is hostile territory."
        }
      ]
    },
    family: {
      context: "A family member tries to gently encourage them to step past the front gate to take a short walk in the garden.",
      dialogue: [
        {
          speaker: "Family Member",
          speech: "It's so beautiful and sunny today. Let's walk to the corner garden for just five minutes. I'll be right beside you.",
          innerThought: "Six days inside this apartment. Getting some natural light will do wonders for their spirits."
        },
        {
          speaker: "Sufferer",
          speech: "I... I think I'll stay here and clear the balcony plants instead. You go ahead, enjoy the walk!",
          innerThought: "Just looking at that bright, wide street makes my knees shake. What if my heart starts pounding when we are away from the doorway? The open space feels like falling into a void."
        },
        {
          speaker: "Family Member",
          speech: "But you can't stay cooped up inside forever. It's just forty steps, honey. You can do this.",
          innerThought: "I don't want to push too hard, but avoidance is only making their world smaller."
        },
        {
          speaker: "Sufferer",
          speech: "I know you're right, and I want to... but past that gate, it feels like I'm walking a high tightrope with no net. Please let me try inside today.",
          innerThought: "I feel like such a disappointment. They look at me with so much concern and sadness, but my bedroom is the only place my heart doesn't explode."
        }
      ]
    },
    couple: {
      context: "Their partner has bought tickets for their anniversary movie, but they get frozen with anxiety at the front door.",
      dialogue: [
        {
          speaker: "Partner",
          speech: "The movie starts in twenty minutes! The car is running. Are you ready to go?",
          innerThought: "I hope we can make this anniversary special. We haven't had a proper date out in months."
        },
        {
          speaker: "Sufferer",
          speech: "My chest is so incredibly tight... I don't think I can make it into the car today. I am so sorry.",
          innerThought: "I want to celebrate with them so badly. But my body is throwing high-alert survival signals. If I force myself into that dark theatre, I feel like I will lose complete control."
        },
        {
          speaker: "Partner",
          speech: "Again? I was so excited for tonight. It feels like our whole relationship is confined to these four walls.",
          innerThought: "I feel frustrated, but mostly I just feel deeply lonely and trapped alongside them."
        },
        {
          speaker: "Sufferer",
          speech: "Please don't be angry. Let me order us a wonderful dinner from your favourite spot and we can light candles. I love you so much.",
          innerThought: "Seeing their disappointment hurts worse than the physical panic. I feel like an anchor holding them back from a normal, happy life."
        }
      ]
    }
  },
  "adhd-focus": {
    friend: {
      context: "A friend is telling an engaging story over lunch, but they are constantly checking their phone and looking around.",
      dialogue: [
        {
          speaker: "Friend",
          speech: "And then she turned around and said we had to rewrite the entire script! Can you believe that?",
          innerThought: "They've looked at their phone three times, and they are spacing out. Are they bored of me?"
        },
        {
          speaker: "Sufferer",
          speech: "Oh wow, that is absolutely crazy! Rewrite the entire thing? No way.",
          innerThought: "I am listening, I promise! But the music in this cafe is so loud, and I just noticed the barista has the exact same tattoo as my cousin. My brain is sprinting in ten directions."
        },
        {
          speaker: "Friend",
          speech: "You're barely here. Did you even hear what I said about the director's email?",
          innerThought: "It feels bad trying to talk to someone who keeps getting distracted by shiny objects."
        },
        {
          speaker: "Sufferer",
          speech: "I'm so sorry. I heard about the script rewrite, but I got completely distracted by the wall clock's ticking sound. It's not you, my brain filters are just malfunctioning today.",
          innerThought: "I feel so rude and stupid. I want to be a supportive friend, but keeping my thoughts locked on one voice during a loud lunch is like catching water with a net."
        }
      ]
    },
    family: {
      context: "Their sibling is upset because they forgot a promise to pick up keys, losing them for the fourth time this week.",
      dialogue: [
        {
          speaker: "Sibling",
          speech: "Where are the house keys? I've been waiting outside in the hallway for forty minutes!",
          innerThought: "They are so irresponsible. It's a simple task to keep track of a keychain."
        },
        {
          speaker: "Sufferer",
          speech: "I put them... wait, I had them next to the grocery bag, or maybe in the drawer? Let me tear the room apart, I'll find them!",
          innerThought: "Oh no, no, no. I walked in, got a text about my exam, put the keys down somewhere 'temporary', and now they've vanished into thin air. Why does my short-term memory keep deleting files?"
        },
        {
          speaker: "Sibling",
          speech: "This is the third time this month. Do you just not care about anyone else's time?",
          innerThought: "They act like their own world is the only one that exists."
        },
        {
          speaker: "Sufferer",
          speech: "I care so much! I hate that I do this to you. My head was just spinning with task-noise and they slipped my mind. I'm so sorry.",
          innerThought: "I am so incredibly angry at my own brain. I didn't do this on purpose, but telling them 'I forgot' makes me sound like a careless toddler."
        }
      ]
    },
    couple: {
      context: "Their partner is trying to discuss household monthly bills, but they keep starting other chores mid-conversation.",
      dialogue: [
        {
          speaker: "Partner",
          speech: "So the electric bill is due on Tuesday, and we need to split the grocery costs. Are you writing this down?",
          innerThought: "They just stood up to arrange the books on the shelf. We are in the middle of a serious budget discussion!"
        },
        {
          speaker: "Sufferer",
          speech: "Yes! Tuesday, electric bill. Hey, did you know this shelf is completely dusty? I need to clean this right now before I forget.",
          innerThought: "If I don't wipe this dust right now, my eye will keep catching it forever, and I will lose the bill details anyway. My brain is screaming that this dust is an emergency."
        },
        {
          speaker: "Partner",
          speech: "Please sit back down! The shelf can wait. I need you to focus on this list for just five minutes.",
          innerThought: "I feel like I have to parent my own partner. It's draining."
        },
        {
          speaker: "Sufferer",
          speech: "I'm back, I'm sorry. Let's do this. I'll write it on this sticky note and put it on my computer monitor so I see it. Thank you for keeping me on track.",
          innerThought: "I feel like a burden when they have to use that 'teacher' voice with me. I really don't want to be disorganized, it just feels like my attention is a wild horse."
        }
      ]
    }
  },
  "panic-attack": {
    friend: {
      context: "A friend is talking to them at a shopping mall when they suddenly freeze, breathe heavily, and lean against a pillar.",
      dialogue: [
        {
          speaker: "Friend",
          speech: "Hey, are you feeling okay? You went completely pale and you're sweating.",
          innerThought: "They look like they're about to pass out. What is happening?"
        },
        {
          speaker: "Sufferer",
          speech: "I... I can't catch my breath. The walls feel like they are closing in. Can we walk out to the parking lot?",
          innerThought: "My heart is beating at 150 BPM. I feel like my chest is going to rip open. I need to get out of this mall or I will collapse and die right here."
        },
        {
          speaker: "Friend",
          speech: "Okay, let's step outside immediately. Take a deep breath, I've got your arm. Sit down here.",
          innerThought: "I need to stay calm so they don't panic more, but this is terrifying to watch."
        },
        {
          speaker: "Sufferer",
          speech: "Thank you... The air helps. Please just stay with me. It feels like my body is having a massive false alarm and I can't shut it down.",
          innerThought: "I am so grateful they are here. The panic is slowly peaking, like a giant storm wave, but having them beside me makes me feel slightly anchored."
        }
      ]
    },
    family: {
      context: "A concerned parent rushes to their room at midnight after hearing them gasp for air in a state of high alarm.",
      dialogue: [
        {
          speaker: "Parent",
          speech: "Oh my goodness, sweetheart! Tell me where it hurts, should I call an ambulance?",
          innerThought: "They are clutching their chest and shaking. Is this a heart attack?!"
        },
        {
          speaker: "Sufferer",
          speech: "No, no ambulance... I think it's a panic attack. I just need to breathe. My hands are completely tingling.",
          innerThought: "I am absolutely terrified that my body is dying, but the ambulance bills and hospital rush would make my panic turn into a total breakdown. I just need my mom to hold my freezing hand."
        },
        {
          speaker: "Parent",
          speech: "Okay, I'm sitting right here with you. Squeeze my hand. Breathe in with me... one, two, three, four...",
          innerThought: "Seeing my child this helpless makes me want to cry, but I have to be their anchor right now."
        },
        {
          speaker: "Sufferer",
          speech: "Squeezing... thank you. I can feel my heart rate slowing down a tiny bit. It feels like returning to my body.",
          innerThought: "The terrifying warmth is washing away. Their cool hand and slow voice are pulling me back from the edge of the cliff."
        }
      ]
    },
    couple: {
      context: "During a quiet drive home, they suddenly start shaking, hyperventilating, and ask their partner to pull the car over.",
      dialogue: [
        {
          speaker: "Partner",
          speech: "We are on the highway, honey. What's wrong? Why are you trying to undo your seatbelt?",
          innerThought: "They look terrified, like they are trapped in a cage. Let me find an exit ramp."
        },
        {
          speaker: "Sufferer",
          speech: "Please pull over... on the shoulder, anywhere. I can't breathe. I need to feel the solid ground under my feet.",
          innerThought: "We are in a moving metal box at 60 mph. If I pass out while we are flying down the highway, we will crash. I am trapped, I need to escape this speed."
        },
        {
          speaker: "Partner",
          speech: "I'm pulling over right here, the hazard lights are on. You are safe. Look at me, you are on the ground.",
          innerThought: "This is so sudden. I just want them to feel safe in my arms."
        },
        {
          speaker: "Sufferer",
          speech: "Thank you... holding your shoulder helps. I know we are parked. I don't know why my brain thinks driving fast is an immediate threat.",
          innerThought: "I feel so safe holding their sleeve. The highway noises are still loud, but their steady heartbeat is the focus point my brain needs."
        }
      ]
    }
  },
  "social-phobia": {
    friend: {
      context: "A classmate tries to bring them into a lively group discussion in the university lounge, but they shrink back.",
      dialogue: [
        {
          speaker: "Friend",
          speech: "Hey, come over! We are talking about the music festival. What did you think of the lineup?",
          innerThought: "They're always so quiet. Let me help draw them out into the conversation."
        },
        {
          speaker: "Sufferer",
          speech: "Oh, it looks... pretty cool. I haven't really checked the full list yet, though.",
          innerThought: "All five of them just turned to look at me. Is my hair weird today? What if I say a band name wrong and they laugh? My throat is locking up completely, please look away."
        },
        {
          speaker: "Friend",
          speech: "You should definitely look up the headliners! Don't be so shy, come sit closer.",
          innerThought: "I guess they're just not interested in hanging out with us."
        },
        {
          speaker: "Sufferer",
          speech: "Actually, I have to print some lecture slides before the next class starts. I'll catch you guys later!",
          innerThought: "I feel like such an awkward loser. I love live music, but trying to talk in front of a group feels like standing on a brightly lit stage in front of a critical jury."
        }
      ]
    },
    family: {
      context: "A parent complains because they refuse to make a simple phone call to the dentist to reschedule an appointment.",
      dialogue: [
        {
          speaker: "Parent",
          speech: "It's just a two-minute call to the dentist! Why do you keep putting it off? You are nineteen, you should handle this.",
          innerThought: "They are making such a big deal out of a simple, tiny administrative task. It's frustrating."
        },
        {
          speaker: "Sufferer",
          speech: "I'll do it later, Mom. I have some homework assignments to clear first on my laptop.",
          innerThought: "The thought of dialing that number and having a live person speak to me makes my palms sweat. What if I stutter? What if they ask me a question and I freeze on the line like a toddler?"
        },
        {
          speaker: "Parent",
          speech: "No, do it now. Here is the phone. Just dial and say you need to move it to Thursday.",
          innerThought: "If I don't force them, they will avoid it forever. They need to build some independence."
        },
        {
          speaker: "Sufferer",
          speech: "Please... I can't do it with you standing right over me. Let me write a script of what to say first and I'll call from my bedroom.",
          innerThought: "I feel so small. They think I'm lazy and incompetent. They don't see the silent racing panic that a phone call represents to my brain."
        }
      ]
    },
    couple: {
      context: "Their partner wants to introduce them to their work colleagues at a casual office dinner party, but they are hiding in the corner.",
      dialogue: [
        {
          speaker: "Partner",
          speech: "My team lead is right over there! Let's go say hello. She is super friendly, I promise.",
          innerThought: "I'm so proud of my partner and I want everyone to meet them. I hope they can have a nice chat."
        },
        {
          speaker: "Sufferer",
          speech: "Can we wait on the balcony for a few minutes? There are so many people near the drinks table, it's very crowded.",
          innerThought: "If I go over there, she will ask me what I do, and I will say something clumsy. I'll stand there holding a glass with my hands shaking, and she'll think my partner is dating a complete misfit."
        },
        {
          speaker: "Partner",
          speech: "Are you okay? You've been standing in this quiet corner for half an hour. I wanted us to socialize together.",
          innerThought: "It's a bit exhausting having to check on them constantly and manage their comfort in public."
        },
        {
          speaker: "Sufferer",
          speech: "I am trying my best, I promise. Please hold my hand while we go over to speak with her. It helps me stay grounded in the room.",
          innerThought: "I would rather be anywhere else on earth. But I love my partner, and I want to do this for them, even if my heart is screaming inside."
        }
      ]
    }
  },
  "major-depression": {
    friend: {
      context: "A friend visits their apartment and finds them sitting in a completely dark room, with untouched food on the counter.",
      dialogue: [
        {
          speaker: "Friend",
          speech: "Hey... I let myself in. It is so dark in here! Let me open these curtains and get you some air.",
          innerThought: "This is worrying. They haven't answered any texts for four days. The place feels completely abandoned."
        },
        {
          speaker: "Sufferer",
          speech: "No, please leave the curtains closed. The light is actually hurting my eyes today. Just sit here.",
          innerThought: "I have no energy to look at the world. Everything feels covered in a thick, heavy dark gray paint. Staring at a sunny street just makes me feel more hollow and disconnected."
        },
        {
          speaker: "Friend",
          speech: "Did you eat the soup I sent you yesterday? You look like you've lost weight.",
          innerThought: "I want to be helpful without making them feel interrogated or judged."
        },
        {
          speaker: "Sufferer",
          speech: "I had a few spoonspfuls. Thank you for sending it. I'm just incredibly tired, I need a few more days of rest.",
          innerThought: "I feel like a black hole sucking the energy out of my friends. They shouldn't have to waste their sunny weekends sitting in the dark with someone who is completely empty inside."
        }
      ]
    },
    family: {
      context: "A parent tries to coax them to take a warm shower after they've spent three consecutive days in bed.",
      dialogue: [
        {
          speaker: "Parent",
          speech: "I turned on the water heater, sweetheart. A warm shower will help you feel refreshed and sleep better.",
          innerThought: "They look so fragile and small under that heavy blanket. This illness is stealing my child."
        },
        {
          speaker: "Sufferer",
          speech: "Maybe tonight... I don't really have the strength to stand up right now, Mom.",
          innerThought: "The shower feels like climbing a giant snow-covered mountain. The steps, the drying, the clothes—every single motion requires active willpower that I simply do not have."
        },
        {
          speaker: "Parent",
          speech: "I'll fetch you some clean clothes and put them right here. Just five minutes, okay? We love you so much.",
          innerThought: "I need to encourage them gently. Small steps are the only way forward."
        },
        {
          speaker: "Sufferer",
          speech: "Okay... I'll sit on the bathroom edge and try. Thank you for not giving up on me.",
          innerThought: "I feel so useless. My mother has to look after me like I am a child again. I hate what this weight is doing to our family."
        }
      ]
    },
    couple: {
      context: "Their partner is trying to plan a holiday excursion, but they are entirely silent and unable to express any joy.",
      dialogue: [
        {
          speaker: "Partner",
          speech: "Look at this cabin by the lake! It has a fireplace and hiking trails. Which weekend should we book?",
          innerThought: "I'm trying to find something that will spark their joy again. I miss seeing them smile."
        },
        {
          speaker: "Sufferer",
          speech: "They both look fine. Whichever one is cheaper is perfectly okay with me.",
          innerThought: "I feel absolutely nothing. A beautiful lake, a dark closet—they feel exactly the same to me right now. I don't want to go and ruin their trip with my dead weight."
        },
        {
          speaker: "Partner",
          speech: "Does this trip not excite you at all? I've been planning this for weeks to make you happy.",
          innerThought: "I feel rejected. It's like nothing I do can reach through the armor of their apathy."
        },
        {
          speaker: "Sufferer",
          speech: "I want to go, I promise. It's beautiful. My brain is just locked in a dark fog and my emotions are frozen. Please book it, I want to be there with you.",
          innerThought: "I would give anything to feel happiness or excitement for them. I hate that my depression is a wet blanket on their beautiful energy."
        }
      ]
    }
  }
};

/**
 * Generates beautiful, custom social dialogues for a behavior if handcrafted data is missing.
 * This guarantees a high-fidelity experience for any custom text search.
 */
function generateDynamicScenarios(behavior: BehaviorResult): {
  friend: ConversationScenario;
  family: ConversationScenario;
  couple: ConversationScenario;
} {
  const concept = behavior.clinicalConcept || "this condition";
  const innerThoughts = behavior.insideMind || "Feeling overwhelming tension and panic alarms.";
  const seenAction = behavior.outsideAction || "Avoiding tasks, acting anxious, or closing off.";

  // Clean raw strings to extract essence
  const cleanThoughts = innerThoughts.replace(/^(What they actually feel:|Unspoken reality:)/i, "").trim();
  const cleanAction = seenAction.replace(/^(What people see:|Observable behaviors:)/i, "").trim();

  return {
    friend: {
      context: `A close friend is spending the afternoon with them and notices how ${cleanAction.split(",")[0] || "they seem stuck or avoidant"}.`,
      dialogue: [
        {
          speaker: "Friend",
          speech: "Hey, do you want to step away for a bit? You seem quiet and a little distracted today.",
          innerThought: "They keep doing that anxious habit. I want to make sure they feel safe with me."
        },
        {
          speaker: "Sufferer",
          speech: "Sorry! I'm totally fine, just a little tired today. Let's keep going.",
          innerThought: `${cleanThoughts.slice(0, 110)}... I don't want to explain why this simple thing is making my chest tighten.`
        },
        {
          speaker: "Friend",
          speech: "I've got your back. We don't have to keep doing this draft if it's too much. Let's just grab a seat.",
          innerThought: "I don't need to push for answers, I just want them to know they don't have to pretend."
        },
        {
          speaker: "Sufferer",
          speech: "Thank you. That actually sounds really nice. My head is just a bit noisy right now.",
          innerThought: "Having a friend who accepts my silent struggles without demanding an explanation feels like a massive relief."
        }
      ]
    },
    family: {
      context: `A parent or close family member witnesses them experiencing the daily pressure of ${cleanAction.split(",")[0] || "their anxious habit"} at home.`,
      dialogue: [
        {
          speaker: "Family Member",
          speech: "I noticed you doing that routine again. Is there anything we can adjust around the house to make things easier?",
          innerThought: "I see them struggle daily with this. I want our home to feel like a safe harbour for them."
        },
        {
          speaker: "Sufferer",
          speech: "It's okay, I don't want to disrupt anyone. I can manage it, it's just my usual coping steps.",
          innerThought: `If they knew the scale of my internal thoughts, they would worry constantly. ${cleanThoughts.slice(0, 100)}... I have to handle this of my own accord.`
        },
        {
          speaker: "Family Member",
          speech: "It's never a disruption. We are a team, and we want to understand what you're carrying.",
          innerThought: "I don't want them to feel isolated in their own living room."
        },
        {
          speaker: "Sufferer",
          speech: "Thank you. Sometimes the rules in my head get very loud, and having your patience of mind helps clear the noise.",
          innerThought: "They aren't trying to fix me or judge me—they just want to listen. That ease is everything."
        }
      ]
    },
    couple: {
      context: `Their partner attempts to check in with them after they start pulling away owing to ${cleanAction.split(",")[0] || "their silent mental stress"}.`,
      dialogue: [
        {
          speaker: "Partner",
          speech: "Babe, you've been really quiet tonight. Is there a way I can help ease your mind?",
          innerThought: "They look so worried, and I feel this invisible barrier between us. I want to hold them close."
        },
        {
          speaker: "Sufferer",
          speech: "I'm sorry for being distant. My mind is just completely overwhelmed by these feelings right now.",
          innerThought: `I love them so much, but this symptom feels like a wall. ${cleanThoughts.slice(0, 100)}... I am scared of ruining their mood.`
        },
        {
          speaker: "Partner",
          speech: "You don't have to be perfect for me. I love you, including the messy days. Let's just sit through this together.",
          innerThought: "Their struggles don't make me love them any less. I just want to walk beside them."
        },
        {
          speaker: "Sufferer",
          speech: "Hearing you say that relieves so much of the pressure. Thank you for staying close when everything feels chaotic.",
          innerThought: "They don't expect me to magically snap out of it. Their simple presence lets me relax and breathe again."
        }
      ]
    }
  };
}

/**
 * Fetches 3 realistic, high-fidelity dialogue scenarios for a behavior.
 */
export function getDialogueScenarios(behavior: BehaviorResult): {
  friend: ConversationScenario;
  family: ConversationScenario;
  couple: ConversationScenario;
} {
  // Check if we have handcrafted scenarios for the behavior ID
  if (behavior.id && HANDCRAFTED_SCENARIOS[behavior.id]) {
    return HANDCRAFTED_SCENARIOS[behavior.id];
  }

  // Fallback to generating high-quality templates using the behavior properties
  return generateDynamicScenarios(behavior);
}
