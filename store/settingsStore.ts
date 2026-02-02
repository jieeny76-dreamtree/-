
import { useState, useEffect, useCallback } from 'react';
import { SiteSettings } from '../types';

const SETTINGS_KEY = 'kkumttre_settings';

const DEFAULT_SETTINGS: SiteSettings = {
  bankName: '농협은행',
  accountNumber: '351-1111-2222-33',
  accountHolder: '꿈뜨레 지역공동체',
};

export const useSettingsStore = () => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored settings", e);
      }
    }
  }, []);

  const updateSettings = useCallback((newSettings: SiteSettings) => {
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  }, []);

  return {
    settings,
    updateSettings,
  };
};
