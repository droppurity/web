
"use client";

import { useState } from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { purifiers, basePlanDefinitions } from '@/config/siteData';

export default function HelpMeChooseDialog() {
  const [people, setPeople] = useState<string>('');
  const [alkalinePreference, setAlkalinePreference] = useState<string>('');
  const [copperPreference, setCopperPreference] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [showRecommendation, setShowRecommendation] = useState<boolean>(false);

  const handleGetRecommendation = () => {
    let purifierRec = '';
    let planRec = '';
    let purifierDetails = '';

    const alkalinePurifierInfo = purifiers.find(p => p.id === 'droppurity-alkaline');
    const copperPurifierInfo = purifiers.find(p => p.id === 'droppurity-copper');
    const roPurifierInfo = purifiers.find(p => p.id === 'droppurity-ro-plus');

    if (alkalinePreference === 'yes' && alkalinePurifierInfo) {
      purifierRec = alkalinePurifierInfo.name;
      purifierDetails = ` (good for acidity concerns and pH balance)`;
    } else if (copperPreference === 'yes' && copperPurifierInfo) {
      purifierRec = copperPurifierInfo.name;
      purifierDetails = ` (provides benefits of copper infusion)`;
    } else if (roPurifierInfo) {
      purifierRec = roPurifierInfo.name;
      purifierDetails = ` (excellent all-around purification)`;
    } else {
      purifierRec = "a suitable Droppurity purifier";
    }

    const basicPlanInfo = basePlanDefinitions.find(p => p.name === 'Basic');
    const valuePlanInfo = basePlanDefinitions.find(p => p.name === 'Value');
    const commercialPlanInfo = basePlanDefinitions.find(p => p.name === 'Commercial');

    if (people === '1-2' && basicPlanInfo) {
      planRec = `${basicPlanInfo.name} plan (up to ${basicPlanInfo.limits.replace('Upto ', '')})`;
    } else if (people === '3-4' && valuePlanInfo) {
      planRec = `${valuePlanInfo.name} plan (upto ${valuePlanInfo.limits.replace('Upto ', '')})`;
    } else if (people === '5+' && commercialPlanInfo) {
      planRec = `${commercialPlanInfo.name} plan (up to ${commercialPlanInfo.limits.replace('Upto ', '')})`;
    } else {
       planRec = "a suitable plan based on your daily usage";
    }
    
    let message = `Based on your answers, we recommend the **${purifierRec}**${purifierDetails}.`;
    if (planRec) {
        message += ` For your household size, the **${planRec}** should be a good fit.`;
    }
    message += "\n\nYou can explore these options in our plans section to find the perfect match!";

    setRecommendation(message);
    setShowRecommendation(true);
  };

  const resetDialogState = () => {
    setPeople('');
    setAlkalinePreference('');
    setCopperPreference('');
    setRecommendation(null);
    setShowRecommendation(false);
  };

  return (
    <DialogContent className="sm:max-w-[525px]" onCloseAutoFocus={resetDialogState}>
      <DialogHeader>
        <DialogTitle>Help Me Choose the Right Plan</DialogTitle>
        <DialogDescription>
          Answer a few simple questions and we'll suggest the best options for you.
        </DialogDescription>
      </DialogHeader>
      {!showRecommendation ? (
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="people-group" className="font-semibold text-foreground">How many people will be using the purifier daily?</Label>
            <RadioGroup id="people-group" value={people} onValueChange={setPeople} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1-2" id="people-1-2" />
                <Label htmlFor="people-1-2" className="font-normal text-muted-foreground">1-2 people</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3-4" id="people-3-4" />
                <Label htmlFor="people-3-4" className="font-normal text-muted-foreground">3-4 people</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5+" id="people-5+" />
                <Label htmlFor="people-5+" className="font-normal text-muted-foreground">5 or more people</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alkaline-group" className="font-semibold text-foreground">Do you or your family prefer alkaline water or experience acidity issues?</Label>
            <RadioGroup id="alkaline-group" value={alkalinePreference} onValueChange={setAlkalinePreference} className="flex space-x-4 pt-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="alkaline-yes" />
                <Label htmlFor="alkaline-yes" className="font-normal text-muted-foreground">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="alkaline-no" />
                <Label htmlFor="alkaline-no" className="font-normal text-muted-foreground">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="copper-group" className="font-semibold text-foreground">Are you interested in the benefits of copper-infused water?</Label>
            <RadioGroup id="copper-group" value={copperPreference} onValueChange={setCopperPreference} className="flex space-x-4 pt-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="copper-yes" />
                <Label htmlFor="copper-yes" className="font-normal text-muted-foreground">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="copper-no" />
                <Label htmlFor="copper-no" className="font-normal text-muted-foreground">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      ) : (
        <div className="py-4 space-y-3">
          <h3 className="text-lg font-semibold text-dynamic-accent">Our Recommendation for You:</h3>
          {recommendation && recommendation.split('\n').map((line, index) => (
            <p key={index} className="text-muted-foreground whitespace-pre-line" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </div>
      )}
      <DialogFooter className="sm:justify-between gap-2 mt-2">
        {showRecommendation ? (
          <>
            <Button variant="outline" onClick={() => {
              resetDialogState(); 
            }}>
              Ask Again
            </Button>
            <DialogClose asChild>
              <Button onClick={resetDialogState} className="bg-dynamic-accent text-dynamic-accent-foreground hover:bg-dynamic-accent/90">
                Got it!
              </Button>
            </DialogClose>
          </>
        ) : (
          <>
            <DialogClose asChild>
              <Button variant="outline" onClick={resetDialogState}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleGetRecommendation}
              disabled={!people || !alkalinePreference || !copperPreference}
              className="bg-dynamic-accent text-dynamic-accent-foreground hover:bg-dynamic-accent/90"
            >
              Get Recommendation
            </Button>
          </>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
