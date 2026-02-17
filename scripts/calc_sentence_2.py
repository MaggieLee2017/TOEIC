
def generate_sentence_2(word_entry, idx):
    word, pos = word_entry[0], word_entry[1]
    meanings = word_entry[2]
    collocation = word_entry[3]
    
    templates = TEMPLATES_2.get(pos, TEMPLATES_2["n"])
    template = templates[idx % len(templates)]
    sentence_en = template.format(word=word)
    
    meaning_str = "、".join(meanings)
    sentence_zh = f"（{word} 意為「{meaning_str}」）"
    
    return {
        "id": gen_id("s2", word, idx),
        "vocab_id": gen_id("v", word, 0),
        "level": ["easy", "medium", "hard"][word_entry[4] - 1] if word_entry[4] <= 3 else "easy",
        "sentence_en": sentence_en,
        "sentence_zh": sentence_zh,
        "collocations": [],
    }
