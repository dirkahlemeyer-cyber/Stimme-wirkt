# Stimmewirkt – Markenroute und Mara-Layout

Stand: 13. September 2026, vor dem Release dieses Quellstands.

- Verkaufsprojekt: `sprechende-webseite`, Branch `main`, Production-Rückkehrpunkt `dpl_5P6CedtaNhgckpGkG7CuGf8g4eBQ`, Ready am 13.09.2026 um 02:32:43 MESZ; feste Aliasse `stimmewirkt.de` und `www.stimmewirkt.de` wurden vor dem Release geprüft.
- Dieser Stand führt Kundinnen und Kunden über `/mara` mit unveränderter Markenadresse zum gemeinsamen Kern. Die API, Mara-JavaScript, CSS und das vorhandene Porträt bleiben same-origin über eng begrenzte Rewrites; es gibt keine neue DNS-, Provider- oder Secret-Änderung.
- Startseite und FAQ enthalten die einzigen dezenten Mara-Bewegungen. Preisbox und die Mara-Seite selbst bleiben statisch. Mikrofon, Audio, Turnstile und API werden erst nach bewusstem Start angefordert.
- Preis: 249 EUR einmalig, 99 EUR netto/Monat mit 300 Minuten, optional 60 Minuten für 20 EUR netto und kein Auto-Top-up. „Hier bestellen“ führt nur in die unverbindliche Vorbereitung; „Hier kündigen“ bereitet nur eine E-Mail vor.
- Vorbereitungsprüfung: `npm.cmd run check` bestanden. Die Production-Release-ID und die echte Markenrouten-Abnahme werden nach dem Deployment ergänzt.

Offen und bewusst getrennt: Mara bleibt ohne vollständige, verifizierte Produktionskonfiguration deaktiviert; Hör-, Zahlungs- und E-Mail-Abnahmen sind nicht erfolgt.
