// Copyright 2018 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Page object for the exploration editor's translation tab, for
 * use in Protractor tests.
 */

var action = require('./action.js');
var forms = require('./forms.js');
var general = require('./general.js');
var waitFor = require('./waitFor.js');
var path = require('path');

var ExplorationEditorTranslationTab = function() {
  var dismissWelcomeModalButton = element(
    by.css('.protractor-test-translation-tab-dismiss-welcome-modal'));
  var translationWelcomeModal = element(
    by.css('.protractor-test-translation-tab-welcome-modal'));
  var buttons = element.all(by.css('.ng-joyride .skipBtn'));
  var nextTutorialStageButton = element.all(by.css('.ng-joyride .nextBtn'));
  var translationTabStartTutorialElement = element(by.css(
    '.protractor-test-translation-tab-start-tutorial'));
  var titleElement = element(by.css('.ng-joyride-title'));

  this.exitTutorial = async function() {
    // If the translation welcome modal shows up, exit it.
    await action.click(
      'Dismiss Welcome Modal Button', dismissWelcomeModalButton);
    await waitFor.invisibilityOf(
      translationWelcomeModal,
      'Translation welcome modal takes too long to disappear');

    // Otherwise, if the translation tutorial shows up, exit it.
    if (await buttons.count() === 1) {
      await action.click('Skip button', button.get(0));
    } else if (await buttons.count() !== 0) {
      throw new Error(
        'Expected to find at most one \'exit tutorial\' button');
    }
  };

  this.finishTutorial = async function() {
    // Finish the tutorial.
    var finishTutorialButton = element.all(by.buttonText('Finish'));
    await waitFor.elementToBeClickable(
      finishTutorialButton.first(),
      'Finish Tutorial Stage button is not clickable');
    var buttons = finishTutorialButton;
    if (await buttons.count() === 1) {
      await buttons.get(0).click();
    } else {
      throw new Error('There is more than 1 Finish button!');
    }
  };

  this.playTutorial = async function() {
    var tutorialTabHeadings = [
      'Translations In Oppia',
      'Choose Language',
      'Choose a Card to Translate',
      'Choose a Part of the Card to Translate',
      'Recording Audio',
      'Re-record/Re-upload audio'
    ];
    for (const HEADING of tutorialTabHeadings) {
      var tutorialTabHeadingElement = element(by.cssContainingText(
        '.popover-title', HEADING));
      await waitFor.visibilityOf(
        tutorialTabHeadingElement, 'Tutorial: ' + HEADING + ' is not visible');
      // Progress to the next instruction in the tutorial.
      await waitFor.elementToBeClickable(
        nextTutorialStageButton.first(),
        'Next Tutorial Stage button is not clickable');
      var buttons = nextTutorialStageButton;
      if (await buttons.count() === 1) {
        await buttons.get(0).click();
        await waitFor.invisibilityOf(
          tutorialTabHeadingElement,
          'Tutorial stage takes too long to disappear');
      } else {
        throw new Error('There is more than one Next button!');
      }
    }
  };

  this.startTutorial = async function() {
    await waitFor.visibilityOf(
      translationWelcomeModal,
      'Translation welcome modal takes too long to appear');
    await translationTabStartTutorialElement.click();
    await waitFor.visibilityOf(
      titleElement, 'Translation tutorial modal takes too long to appear');
  };

  var startRecordButton = element(
    by.css('.protractor-test-accessibility-translation-start-record'));
  var stopRecordButton = element(
    by.css('.protractor-test-stop-record-button'));
  var confirmRecordButton = element(
    by.css('.protractor-test-confirm-record'));
  var playRecordButton = element(
    by.css('.protractor-test-play-pause-audio-button'));
  // Two such elements are in the DOM, but only the second is visible.
  var uploadAudioButton = element.all(
    by.css('.protractor-test-upload-audio-button')).last();
  var audioUploadInput = element(
    by.css('.protractor-test-upload-audio-input'));
  var saveUploadedAudioButton = element(
    by.css('.protractor-test-save-uploaded-audio-button'));
  var deleteRecordButton = element(
    by.css('.protractor-test-delete-record'));
  var confirmDeleteRecordButton = element(
    by.css('.protractor-test-confirm-discard-changes'));
  var contentTabButton = element(
    by.css('.protractor-test-translation-content-tab'));
  var feedbackTabButton = element(
    by.css('.protractor-test-translation-feedback-tab'));
  var hintsTabButton = element(
    by.css('.protractor-test-translation-hints-tab'));
  var solutionTabButton = element(
    by.css('.protractor-test-translation-solution-tab'));
  var contentTabText = element(by.css('.protractor-test-content-text'));
  var solutionTabText = element(by.css('.protractor-test-solution-text'));
  var numericalStatus = element(
    by.css('.protractor-test-translation-numerical-status'));
  var translationTabContentAccessibility = element(
    by.css('.protractor-test-accessibility-translation-content'));
  var translationTabFeedbackAccessibility = element(
    by.css('.protractor-test-accessibility-translation-feedback'));
  var translationTabHintAccessibility = element(
    by.css('.protractor-test-accessibility-translation-hint'));
  var translationTabSolutionAccessibility = element(
    by.css('.protractor-test-accessibility-translation-solution'));
  var translationTabStartRecordingAccessibility = element(
    by.css('.protractor-test-accessibility-translation-start-record'));
  var translationTabUploadRecordingAccessibility = element(
    by.css('.protractor-test-accessibility-translation-upload-audio'));
  var translationTabPlayRecordingAccessibility = element(
    by.css('.protractor-test-accessibility-translation-play-recorded-audio'));
  var selectedLanguageElement = element(
    by.css('.protractor-test-translation-language-selector')).element(
    by.css('option:checked'));
  var languageSelectorElement = element(
    by.css('.protractor-test-translation-language-selector'));
  var languageSelectorLabelElement = element(
    by.css('.protractor-test-language-selector-label'));
  var progressBarLabelElement = element(
    by.css('.protractor-test-progress-info'));
  var translationModeButton = element(
    by.css('.protractor-test-translation-mode'));
  var voiceoverModeButton = element(by.css('.protractor-test-voiceover-mode'));
  var saveTranslationButton = element(
    by.css('.protractor-test-save-translation'));
  var editTranslationButtton = element(
    by.css('.protractor-test-edit-translation'));
  var translationDisplay = element(
    by.css('.protractor-test-translation-display'));
  var stateGraph = element(
    by.css('.protractor-test-translation-graph'));
  var feedbackList = element.all(
    by.css('.protractor-test-translation-feedback'));
  var stateBackgroundNodes = stateGraph.all(
    by.css('.protractor-test-node-background'));
  var stateNodes = stateGraph.all(
    by.css('.protractor-test-node'));
  var audioOverFiveMinutesErrorMessageElement = element(
    by.css('.protractor-test-audio-file-upload-field-error-message'));
  var audioUploadErrorMessageElement = element(by.css(
    '.protractor-test-upload-error-message'));
  var playPauseAudioButton = element(
    by.css('.protractor-test-play-pause-audio-button'));
  var audioMaterialSliderDiv = element(by.css('.mat-slider'));
  var closeAudioUploaderModalButton = element(
    by.css('.protractor-test-close-audio-upload-modal'));
  var audioUploadContainerElement = element(by.css(
    '.protractor-test-audio-upload-container'));
  var nodeLabelLocator = by.css('.protractor-test-node-label');
  var stateTranslationEditorLocator = by.css(
    '.protractor-test-state-translation-editor');
  var activeTranslationTabElement = element(
    by.css('.protractor-test-active-translation-tab'));
  var translationFeedback = function(index) {
    return element(by.css('.protractor-test-feedback-' + index));
  };
  var translationFeedbackText = function(index) {
    return element(by.css('.protractor-test-feedback-' + index + '-text'));
  };
  var translationHint = function(index) {
    return element(by.css('.protractor-test-hint-' + index));
  };
  var translationHintText = function(index) {
    return element(by.css('.protractor-test-hint-' + index + '-text'));
  };
  var _selectLanguage = async function(language) {
    await waitFor.visibilityOf(
      languageSelectorElement,
      'Language selector takes too long to appear.');
    var languageButton = languageSelectorElement.element(
      by.cssContainingText('option', language));
    await action.click('Language button', languageButton);
  };
  var stateNodeLabel = function(nodeElement) {
    return nodeElement.element(nodeLabelLocator);
  };

  this.deleteAudioRecord = async function() {
    await waitFor.elementToBeClickable(
      deleteRecordButton,
      'Delete Record button is not clickable');
    await deleteRecordButton.click();
    await waitFor.elementToBeClickable(
      confirmDeleteRecordButton,
      'The confirm record deletion button is not clickable');
    await confirmDeleteRecordButton.click();
    await waitFor.pageToFullyLoad();
  };

  this.uploadAudioRecord = async function(audioPath) {
    await action.click('Audio Record Button', uploadAudioButton);
    absPath = path.resolve(__dirname, audioPath);
    await action.sendKeys(
      'Audio upload input', audioUploadInput, absPath, false);
  };

  this.saveAudioRecord = async function() {
    await action.click('Save uploaded audio button', saveUploadedAudioButton);
    await waitFor.pageToFullyLoad();
  };

  this.addAudioRecord = async function() {
    await waitFor.elementToBeClickable(
      startRecordButton,
      'Add Record button is not clickable');
    await startRecordButton.click();
    await waitFor.pageToFullyLoad();
  };

  this.stopAudioRecord = async function() {
    await waitFor.elementToBeClickable(
      stopRecordButton,
      'Stop Record button is not clickable');
    await stopRecordButton.click();
    await waitFor.pageToFullyLoad();
  };

  this.confirmAudioRecord = async function() {
    await waitFor.elementToBeClickable(
      confirmRecordButton,
      'Confirm record addition is not clickable');
    await confirmRecordButton.click();
    await waitFor.pageToFullyLoad();
  };

  this.playAudioRecord = async function() {
    await waitFor.elementToBeClickable(
      playRecordButton,
      'Play Record button is not clickable');
    await playRecordButton.click();
    await waitFor.pageToFullyLoad();
  };

  this.uploadAudioFileForLanguage = async function(
      language, relativePathOfAudioToUpload) {
    await this.changeLanguage(language);
    await this.openUploadAudioModal();
    await this.uploadAudio(relativePathOfAudioToUpload);
  };

  this.setTranslation = async function(richTextInstructions) {
    await waitFor.elementToBeClickable(
      editTranslationButtton,
      'editTranslationButtton taking too long to appear to set content');
    await editTranslationButtton.click();
    var stateTranslationEditorTag = element(
      by.tagName('state-translation-editor'));
    var stateTranslationEditor = stateTranslationEditorTag.element(
      stateTranslationEditorLocator);
    await waitFor.visibilityOf(
      stateTranslationEditor,
      'stateTranslationEditor taking too long to appear to set content');
    var richTextEditor = await forms.RichTextEditor(stateTranslationEditor);
    await richTextEditor.clear();
    await richTextInstructions(richTextEditor);
    expect(await saveTranslationButton.isDisplayed()).toBe(true);
    await saveTranslationButton.click();
    await waitFor.invisibilityOf(
      saveTranslationButton,
      'State translation editor takes too long to disappear');
  };

  this.expectSaveUploadedAudioButtonToBeDisabled = async function() {
    expect(await saveUploadedAudioButton.getAttribute('disabled')).toBe(
      'true');
  };

  this.uploadAudio = async function(relativePathOfAudioToUpload) {
    var audioAbsolutePath = path.resolve(
      __dirname, relativePathOfAudioToUpload);
    await action.sendKeys(
      'Audio upload input', audioUploadInput, audioAbsolutePath, false);
    await action.click('Save uploaded audio button', saveUploadedAudioButton);
    await waitFor.invisibilityOf(
      saveUploadedAudioButton,
      'Upload Audio modal takes too long to disappear');
  };

  this.expectWrongFileType = async function(relativePathOfAudioToUpload) {
    var audioAbsolutePath = path.resolve(
      __dirname, relativePathOfAudioToUpload);
    await audioUploadInput.sendKeys(audioAbsolutePath);
    // A fake click to trigger onChange event for audioUploadInput.
    await audioUploadContainerElement.click();
    await waitFor.visibilityOf(
      audioUploadErrorMessageElement,
      'Audio upload error message element is not visible');
    expect(await audioUploadErrorMessageElement.getText())
      .toContain('This file is not recognized as an audio file.');
  };

  this.expectAudioOverFiveMinutes = async function(
      relativePathOfAudioToUpload) {
    var audioAbsolutePath = path.resolve(
      __dirname, relativePathOfAudioToUpload);
    await audioUploadInput.sendKeys(audioAbsolutePath);
    await waitFor.elementToBeClickable(
      saveUploadedAudioButton, 'Save button is not clickable');
    await saveUploadedAudioButton.click();
    await waitFor.visibilityOf(
      audioOverFiveMinutesErrorMessageElement, 'Error element is not visible');
    await expect(audioOverFiveMinutesErrorMessageElement.getText()).toContain(
      'Audio files must be under 300 seconds in length.');
  };

  this.openUploadAudioModal = async function() {
    await action.click('Upload Audio button', uploadAudioButton);
  };

  this.closeUploadAudioModal = async function() {
    await waitFor.elementToBeClickable(
      closeAudioUploaderModalButton,
      'Close audio uploader modal button is not clickable');
    await closeAudioUploaderModalButton.click();
  };

  this.playOrPauseAudioFile = async function() {
    await waitFor.visibilityOf(
      playPauseAudioButton,
      'Play or pause audio button is taking too long to appear');
    await playPauseAudioButton.click();
    return await this._isAudioPlaying();
  };

  this._isAudioPlaying = async function() {
    await waitFor.visibilityOf(
      audioMaterialSliderDiv,
      'Audio progress slider bar is taking too long to appear');
    var firstValue = await audioMaterialSliderDiv.getAttribute(
      'aria-valuenow');
    try {
      await waitFor.elementAttributeToBe(
        audioMaterialSliderDiv, 'aria-valuenow', firstValue + 1,
        'Audio slider is not advancing');
      return true;
    } catch (e) {
      var secondValue = await audioMaterialSliderDiv.getAttribute(
        'aria-valuenow');
      if (firstValue && secondValue) {
        return +firstValue < +secondValue;
      }
    }
  };

  this.expectTranslationToMatch = async function(richTextInstructions) {
    await forms.expectRichText(translationDisplay).toMatch(
      richTextInstructions);
  };

  this.switchToVoiceoverMode = async function() {
    await waitFor.elementToBeClickable(
      voiceoverModeButton,
      'Voiceover Mode switch is taking too long to appear');
    await voiceoverModeButton.click();
    await waitFor.pageToFullyLoad();
  };

  this.switchToTranslationMode = async function() {
    await waitFor.elementToBeClickable(
      translationModeButton,
      'Translation Mode switch is taking too long to appear');
    await translationModeButton.click();
    await waitFor.pageToFullyLoad();
  };

  this.expectToBeInTranslationMode = async function() {
    await waitFor.visibilityOf(
      languageSelectorLabelElement,
      'Language selector label element taking too long to appear');
    expect(await languageSelectorLabelElement.getText()).toBe(
      'Translations for language:');
    expect(await progressBarLabelElement.getText()).toBe(
      'Exploration translation progress:');
    await waitFor.visibilityOf(
      translationModeButton,
      'Translation mode button taking to long to appear');
    expect(await translationModeButton.getAttribute('class')).toMatch(
      'oppia-active-mode');
    expect(await voiceoverModeButton.getAttribute('class')).not.toMatch(
      'oppia-active-mode');
  };

  this.expectToBeInVoiceoverMode = async function() {
    await waitFor.visibilityOf(
      languageSelectorLabelElement,
      'Language selector label element taking too long to appear');
    expect(await languageSelectorLabelElement.getText()).toBe(
      'Voiceovers for language:');
    expect(await progressBarLabelElement.getText()).toBe(
      'Exploration voiceover progress:');
    await waitFor.visibilityOf(
      translationModeButton,
      'Translation mode button taking to long to appear');
    expect(await translationModeButton.getAttribute('class')).not.toMatch(
      'oppia-active-mode');
    expect(await voiceoverModeButton.getAttribute('class')).toMatch(
      'oppia-active-mode');
  };

  this.expectContentTabContentToMatch = async function(content) {
    await waitFor.elementToBeClickable(
      contentTabButton, 'Content Tab button is not clickable');
    await contentTabButton.click();
    expect(await contentTabText.getText()).toMatch(content);
  };

  this.expectFeedbackTabContentsToMatch = async function(contents) {
    await waitFor.elementToBeClickable(
      feedbackTabButton, 'Feedback Tab button is not clickable');
    await feedbackTabButton.click();
    expect(await feedbackList.count()).toEqual(contents.length);
    for (var index in contents) {
      await translationFeedback(index).click();
      expect(await translationFeedbackText(index).getText()).toMatch(
        contents[index]);
    }
  };

  this.expectHintsTabContentsToMatch = async function(contents) {
    await waitFor.elementToBeClickable(
      hintsTabButton, 'Hints Tab button is not clickable');
    await hintsTabButton.click();
    for (var index in contents) {
      await translationHint(index).click();
      expect(await translationHintText(index).getText()).toMatch(
        contents[index]);
    }
  };

  this.expectSolutionTabContentToMatch = async function(content) {
    await waitFor.elementToBeClickable(
      solutionTabButton, 'Solution Tab button is not clickable');
    await solutionTabButton.click();
    expect(await solutionTabText.getText()).toMatch(content);
  };

  this.expectNumericalStatusToMatch = async function(content) {
    expect(await numericalStatus.getText()).toMatch(content);
  };

  this.expectNumericalStatusAccessibilityToMatch = async function(content) {
    await waitFor.visibilityOf(
      numericalStatus,
      'Numerical status element taking too long to appear');
    expect(await numericalStatus.getAttribute('aria-label')).toMatch(content);
  };

  this.expectContentAccessibilityToMatch = async function(content) {
    expect(await translationTabContentAccessibility.getAttribute(
      'aria-label')).toMatch(content);
  };

  this.expectFeedbackAccessibilityToMatch = async function(content) {
    expect(await translationTabFeedbackAccessibility.getAttribute(
      'aria-label')).toMatch(content);
  };

  this.expectHintAccessibilityToMatch = async function(content) {
    expect(await translationTabHintAccessibility.getAttribute(
      'aria-label')).toMatch(content);
  };

  this.expectSolutionAccessibilityToMatch = async function(content) {
    expect(await translationTabSolutionAccessibility.getAttribute(
      'aria-label')).toMatch(content);
  };

  this.expectStartRecordingAccessibilityToMatch = async function(content) {
    expect(await translationTabStartRecordingAccessibility.getAttribute(
      'aria-label')).toMatch(content);
  };

  this.expectUploadRecordingAccessibilityToMatch = async function(content) {
    expect(await translationTabUploadRecordingAccessibility.getAttribute(
      'aria-label')).toMatch(content);
  };

  this.expectPlayRecordingAccessibilityToMatch = async function(content) {
    expect(await translationTabPlayRecordingAccessibility.getAttribute(
      'aria-label')).toMatch(content);
  };

  this.changeLanguage = async function(language) {
    await _selectLanguage(language);
    await waitFor.pageToFullyLoad();
  };

  this.expectSelectedLanguageToBe = async function(language) {
    await waitFor.visibilityOf(
      selectedLanguageElement,
      'Selected language element taking too long to appear');
    expect(await selectedLanguageElement.getText()).toMatch(language);
  };

  this.navigateToFeedbackTab = async function() {
    await general.scrollToTop();
    await waitFor.elementToBeClickable(
      feedbackTabButton,
      'Feedback tab of translation page is not clickable');
    await feedbackTabButton.click();
    await waitFor.pageToFullyLoad();
  };

  this.expectFeedbackTabToBeActive = function() {
    expect(
      feedbackTabButton[0]
    ).toEqual(activeTranslationTabElement[0]);
  };

  this.moveToState = async function(targetName) {
    await general.scrollToTop();
    var listOfNames = await stateNodes.map(async function(stateElement) {
      return await stateNodeLabel(stateElement).getText();
    });
    var matched = false;
    for (var i = 0; i < listOfNames.length; i++) {
      if (listOfNames[i] === targetName) {
        await stateNodes.get(i).click();
        matched = true;
      }
    }
    if (!matched) {
      throw new Error(
        'State ' + targetName + ' not found by editorTranslationTab.' +
        'moveToState.');
    }
  };

  this.expectCorrectStatusColor = async function(stateName, expectedColor) {
    var listOfNames = await stateNodes.map(async function(stateElement) {
      return await stateNodeLabel(stateElement).getText();
    });
    var matched = false;
    for (var i = 0; i < listOfNames.length; i++) {
      if (listOfNames[i] === stateName) {
        expect(await stateBackgroundNodes.get(i).getCssValue('fill')).toBe(
          expectedColor);
        matched = true;
      }
    }
    if (!matched) {
      throw new Error(
        'State ' + targetName +
        ' not found by editorTranslationTab.expectCorrectStatusColor.');
    }
  };
};
exports.ExplorationEditorTranslationTab = ExplorationEditorTranslationTab;
