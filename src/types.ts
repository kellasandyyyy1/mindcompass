export interface RelatedDisorder {
  disorder: string;
  percentage: number;
}

export interface TriOrigin {
  body: string;
  mind: string;
  world: string;
}

export interface AudioVisualMock {
  title: string;
  duration: string;
  description: string;
  narrator: string;
  transcript: string;
}

export interface DialogueLine {
  speaker: string;
  speech: string;
  innerThought?: string;
}

export interface ConversationScenario {
  context: string;
  dialogue: DialogueLine[];
}

export interface BehaviorResult {
  id: string;
  query: string;
  clinicalConcept: string;
  shortExplanation: string;
  outsideAction: string;
  insideMind: string;
  matchMeter: RelatedDisorder[];
  triOrigin: TriOrigin;
  audioVisualMock?: AudioVisualMock;
  childhoodEnvironment: string;
  childhoodCauses: string;
  searchSentences?: string[];
  tags?: string[];
  analogy?: string;
  conversationScenario?: ConversationScenario;
}
