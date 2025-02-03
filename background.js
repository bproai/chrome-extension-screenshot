// Background service worker for Chrome extension

// Constants for market hours (PT)
const PREMARKET_START_HOUR = 1;
const PREMARKET_END_HOUR = 6;
const PREMARKET_MINUTE = 30;
const NOTIFICATION_ADVANCE = 30; // minutes before premarket (1:00 AM PT)

// Notification types
const NOTIFICATIONS = {
  PREMARKET_START: 'premarket_start',
  PREMARKET_END: 'premarket_end'
};

// US Market Holidays for 2025
const MARKET_HOLIDAYS = [
  '2025-01-01', // New Year's Day
  '2025-01-20', // Martin Luther King Jr. Day
  '2025-02-17', // Presidents Day
  '2025-04-18', // Good Friday
  '2025-05-26', // Memorial Day
  '2025-06-19', // Juneteenth
  '2025-07-04', // Independence Day
  '2025-09-01', // Labor Day
  '2025-11-27', // Thanksgiving Day
  '2025-12-25', // Christmas Day
];

// Check if a date is a market holiday
function isMarketHoliday(date) {
  const dateStr = date.toISOString().split('T')[0];
  return MARKET_HOLIDAYS.includes(dateStr);
}

// Check if it's a trading day (weekday and not a holiday)
function isTradingDay(date) {
  const day = date.getDay();
  return day >= 1 && day <= 5 && !isMarketHoliday(date);
}

// Create notification
function createNotification(type) {
  const notifications = {
    [NOTIFICATIONS.PREMARKET_START]: {
      title: 'Premarket Trading Start Reminder',
      message: 'Premarket trading begins in 30 minutes (1:30 AM PT)'
    },
    [NOTIFICATIONS.PREMARKET_END]: {
      title: 'Premarket Trading End Reminder',
      message: 'Premarket trading ends in 30 minutes (6:30 AM PT - Regular market hours begin)'
    }
  };

  const notification = notifications[type];
  if (!notification) return;

  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title: notification.title,
    message: notification.message,
    priority: 2
  });
}

// Schedule next notification
function scheduleNextNotification() {
  const now = new Date();
  const currentHour = now.getHours();
  const nextCheck = new Date(now);
  nextCheck.setSeconds(0);
  nextCheck.setMilliseconds(0);

  // Determine next notification time
  if (currentHour < PREMARKET_START_HOUR) {
    // Schedule premarket start notification for today at 1:00 AM
    nextCheck.setHours(PREMARKET_START_HOUR);
    nextCheck.setMinutes(0);
  } else if (currentHour < PREMARKET_END_HOUR) {
    // Schedule premarket end notification for today at 6:00 AM
    nextCheck.setHours(PREMARKET_END_HOUR);
    nextCheck.setMinutes(0);
  } else {
    // Schedule premarket start notification for tomorrow at 1:00 AM
    nextCheck.setDate(nextCheck.getDate() + 1);
    nextCheck.setHours(PREMARKET_START_HOUR);
    nextCheck.setMinutes(0);
  }

  // Keep advancing the date until we find the next trading day
  while (!isTradingDay(nextCheck)) {
    nextCheck.setDate(nextCheck.getDate() + 1);
  }

  // Calculate delay in minutes
  const delayInMinutes = Math.max(1, (nextCheck - now) / (1000 * 60));

  // Determine notification type based on time
  const notificationType = nextCheck.getHours() === PREMARKET_START_HOUR
    ? NOTIFICATIONS.PREMARKET_START
    : NOTIFICATIONS.PREMARKET_END;

  // Create alarm with notification type in name
  chrome.alarms.create(`marketCheck_${notificationType}`, {
    delayInMinutes: delayInMinutes
  });
}

// Handle alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name.startsWith('marketCheck_')) {
    const now = new Date();
    if (isTradingDay(now)) {
      const notificationType = alarm.name.split('_')[1];
      createNotification(notificationType);
    }
    // Schedule next notification
    scheduleNextNotification();
  }
});

// Handle extension installation or update
chrome.runtime.onInstalled.addListener(() => {
  // Initialize notification settings
  chrome.storage.local.get(['preMarketNotifications'], (result) => {
    if (result.preMarketNotifications === undefined) {
      chrome.storage.local.set({ preMarketNotifications: true });
    }
    if (result.preMarketNotifications) {
      scheduleNextNotification();
    }
  });
});

// Listen for messages from the calendar page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'toggleNotifications') {
    chrome.storage.local.set({ preMarketNotifications: request.enabled }, () => {
      if (request.enabled) {
        scheduleNextNotification();
      } else {
        chrome.alarms.clear('premarketCheck');
      }
      sendResponse({ success: true });
    });
    return true; // Will respond asynchronously
  }
});
