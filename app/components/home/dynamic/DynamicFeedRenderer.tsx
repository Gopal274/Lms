import React from 'react';
import { View } from 'react-native';
import ContinueWatching, { WatchItem } from './ContinueWatching';
import Recommendations, { RecommendationItem } from './Recommendations';

export interface DynamicSection {
  id: string;
  type: 'continue_watching' | 'recommended_videos' | 'practice_questions' | 'recently_viewed';
  title: string;
  data: any[];
}

interface DynamicFeedRendererProps {
  sections: DynamicSection[];
}

const DynamicFeedRenderer: React.FC<DynamicFeedRendererProps> = ({ sections }) => {
  return (
    <View>
      {sections.map((section) => {
        switch (section.type) {
          case 'continue_watching':
            return (
              <ContinueWatching 
                key={section.id} 
                items={section.data as WatchItem[]} 
              />
            );
          case 'recommended_videos':
          case 'recently_viewed':
            return (
              <Recommendations 
                key={section.id} 
                title={section.title} 
                items={section.data as RecommendationItem[]} 
              />
            );
          // Add more cases as needed
          default:
            return null;
        }
      })}
    </View>
  );
};

export default DynamicFeedRenderer;
