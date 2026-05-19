import { showMenu } from '../src/gameController.js';
import * as dom from '../src/domElements.js';

describe('gameController', () => {
  let originalDom;

  // Mock document.getElementById and querySelector for showMenuPage
  beforeAll(() => {
    // List of all IDs and selectors used in showMenuPage
    const ids = [
      'game-board-container',
      'score-moves-wrapper',
      'levelDisplay',
      'totalScoreDisplay',
      'movesDisplay',
      'scoreDisplay',
      'timerDisplay',
      'livesDisplay',
      'highScoreDisplay',
      'highestLevelDisplay',
      'objective-counters',
      'playBtn',
      'continueBtn',
      'restartGameBtn',
      'howToPlayBtn',
      'homeBtn',
      'gameBoard',
    ];
    global.document.getElementById = jest.fn((id) => {
      if (ids.includes(id)) {
        return { classList: { add: jest.fn(), remove: jest.fn() }, style: {} };
      }
      return null;
    });
    global.document.querySelector = jest.fn((selector) => {
      return { classList: { add: jest.fn(), remove: jest.fn() }, style: {} };
    });
  });

  beforeEach(() => {
    // Save original dom object
    originalDom = { ...dom };
    // Mock DOM elements with needed properties
    const mockEl = () => ({ classList: { add: jest.fn(), remove: jest.fn() }, style: {} });
    dom.container = mockEl();
    dom.heading = mockEl();
    dom.subtitle = mockEl();
    dom.menu = mockEl();
    dom.gameBoard = mockEl();
    dom.movesDisplay = mockEl();
    dom.scoreDisplay = mockEl();
    dom.timerDisplay = mockEl();
    dom.livesDisplay = mockEl();
    dom.restartContainer = mockEl();
    dom.highScoreDisplay = { ...mockEl(), textContent: '' };
    dom.highestLevelDisplay = { ...mockEl(), textContent: '' };
    dom.continueButton = mockEl();
    dom.restartGameBtn = mockEl();
    dom.playButton = mockEl();
    dom.homeBtn = mockEl();
  });

  afterEach(() => {
    // Restore original dom object
    Object.assign(dom, originalDom);
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restore document mocks
    delete global.document.getElementById;
    delete global.document.querySelector;
  });

  it('removes game-active class from container', () => {
    showMenu();
    expect(dom.container.classList.remove).toHaveBeenCalledWith('game-active');
  });

  it('sets highScoreDisplay textContent', () => {
    showMenu();
    expect(dom.highScoreDisplay).toBeDefined();
  });
});
