# Widżet Last.fm dla strony Kuni_MLB

## Konfiguracja widżetu Last.fm

Aby prawidłowo skonfigurować widżet Last.fm pokazujący aktualnie słuchaną muzykę na Spotify, wykonaj następujące kroki:

1. **Uzyskaj klucz API Last.fm**:
   - Odwiedź stronę [Last.fm API](https://www.last.fm/api/account/create)
   - Zarejestruj się lub zaloguj na swoje konto Last.fm
   - Wypełnij formularz, aby uzyskać klucz API (API Key)
   - Zapisz otrzymany klucz API

2. **Edytuj plik js/lastfm-widget.js**:
   - Otwórz plik `js/lastfm-widget.js` w edytorze kodu
   - Znajdź linijkę z `apiKey: 'YOUR_LASTFM_API_KEY'` (około linii 289)
   - Zamień `'YOUR_LASTFM_API_KEY'` na swój klucz API z Last.fm (w cudzysłowach)
   - Znajdź linijkę z `user: 'YOUR_LASTFM_USERNAME'`
   - Zamień `'YOUR_LASTFM_USERNAME'` na swoją nazwę użytkownika Last.fm (w cudzysłowach)

3. **Połącz Spotify z Last.fm**:
   - Upewnij się, że masz konto Last.fm
   - W ustawieniach konta Last.fm, połącz je ze swoim kontem Spotify
   - Możesz to zrobić w sekcji "Applications" na stronie Last.fm

4. **Dodaj obraz do folderu img**:
   - Upewnij się, że plik `now_playing_adrien.png` (załączony obraz postaci ze słuchawkami) znajduje się w folderze `img/`
   - Jeśli chcesz użyć innego obrazu, zmień ścieżkę w pliku `js/lastfm-widget.js` (linia 74)

## Dostosowanie widżetu

Jeśli chcesz dostosować wygląd lub zachowanie widżetu:

- Wszystkie style wizualne znajdują się w pliku `css/lastfm-widget.css`
- Logika działania i struktura widżetu znajdują się w pliku `js/lastfm-widget.js`

Widżet automatycznie aktualizuje się co 30 sekund, aby pokazać aktualnie odtwarzaną muzykę.

## Funkcje

- Wyświetlanie aktualnie słuchanego utworu z Spotify poprzez Last.fm API
- Pokazywanie okładki albumu
- Link do utworu na Spotify
- Animowane nutki, gdy muzyka jest odtwarzana
- Wsparcie dla wielu języków (polski, angielski, francuski)
- Responsywny design działający na urządzeniach mobilnych

## Rozwiązywanie problemów

Jeśli widżet nie działa poprawnie:

1. Upewnij się, że masz prawidłowy klucz API Last.fm i nazwę użytkownika
2. Sprawdź, czy połączenie między Last.fm a Spotify działa prawidłowo
3. Sprawdź konsolę przeglądarki (F12) pod kątem błędów
4. Upewnij się, że plik obrazu `now_playing_adrien.png` istnieje w folderze `img/`