# Modified by Pressloom (modified SupoClip, AGPL-3.0), 2026-11-24: THEBOLDFONT was removed and
# every bundled font now covers accented Latin letters, so these tests simulate a template font
# without accents (the case a user-uploaded font can still hit) instead of relying on a real one.
from src.font_registry import FONTS_DIR, get_font_codepoints
from src.media import captions

TEMPLATE_FONT = "Anton-Regular"  # the "default" caption template's font
ASCII_ONLY = set(range(0x20, 0x7F))


def _without_accents_in_template_font(monkeypatch):
    real = captions.get_font_codepoints

    def fake(path):
        return ASCII_ONLY if path.stem == TEMPLATE_FONT else real(path)

    monkeypatch.setattr(captions, "get_font_codepoints", fake)


def _build(tmp_path, monkeypatch, hook_title, words=None):
    monkeypatch.setattr(captions, "emoji_rendering_supported", lambda: False)
    output = tmp_path / "captions.ass"
    built = captions.build_assemblyai_ass_subtitles(
        tmp_path / "missing.mp4",
        0.0,
        5.0,
        1080,
        1920,
        output,
        caption_template="default",
        hook_title=hook_title,
        caption_words=words,
        include_captions=bool(words),
    )
    assert built
    return output.read_text(encoding="utf-8")


def test_get_font_codepoints_reads_the_cmap():
    anton = get_font_codepoints(FONTS_DIR / f"{TEMPLATE_FONT}.ttf")
    fallback = get_font_codepoints(FONTS_DIR / f"{captions.GLYPH_FALLBACK_FONT}.ttf")

    assert ord("A") in anton and ord("a") in anton
    assert ord("☃") not in anton  # snowman: not a Latin letter
    assert {ord(ch) for ch in "áéíóúÁÉÍÓÚñÑüÜ"} <= fallback


def test_accented_hook_title_switches_to_a_font_that_has_the_glyphs(
    tmp_path, monkeypatch
):
    _without_accents_in_template_font(monkeypatch)
    content = _build(tmp_path, monkeypatch, "Claude ahora actúa sin que le pidas")
    fallback = captions.ass_font_name(captions.GLYPH_FALLBACK_FONT)

    assert f"Style: Hook,{fallback}," in content
    assert f"Style: Default,{fallback}," in content
    # The default template is all caps, and the fallback keeps that look.
    assert "ACTÚA" in content
    assert "actúa" not in content


def test_accented_caption_words_also_trigger_the_fallback(tmp_path, monkeypatch):
    _without_accents_in_template_font(monkeypatch)
    words = [
        {"text": "Publicá", "start": 0.2, "end": 0.6},
        {"text": "todos", "start": 0.6, "end": 1.0},
        {"text": "días", "start": 1.0, "end": 1.4},
    ]
    content = _build(tmp_path, monkeypatch, None, words)

    assert f"\\fn{captions.ass_font_name(captions.GLYPH_FALLBACK_FONT)}" in content
    assert "DÍAS" in content


def test_accented_text_keeps_a_font_that_covers_it(tmp_path, monkeypatch):
    content = _build(tmp_path, monkeypatch, "Claude ahora actúa sin que le pidas")
    template_font = captions.ass_font_name(TEMPLATE_FONT)

    assert f"Style: Hook,{template_font}," in content
    assert "ACTÚA" in content


def test_plain_ascii_text_keeps_the_template_font(tmp_path, monkeypatch):
    _without_accents_in_template_font(monkeypatch)
    content = _build(tmp_path, monkeypatch, "Claude acts before you ask")
    template_font = captions.ass_font_name(TEMPLATE_FONT)

    assert f"Style: Hook,{template_font}," in content
    assert "ACTS" in content


def test_legacy_theboldfont_name_renders_as_anton():
    assert captions.ass_font_name("THEBOLDFONT") == captions.ass_font_name(TEMPLATE_FONT)
