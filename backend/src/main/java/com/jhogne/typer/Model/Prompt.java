package com.jhogne.typer.Model;

public class Prompt {
    String text;
    String source;

    public Prompt(String text, String source) {
        this.text = text;
        this.source = source;
    }

    public String getText() {
        return text;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public void setText(String text) {
        this.text = text;
    }
}
