package com.jhogne.typer.Model;

public class Prompt {
    String text;
    String source;
    int length;

    public Prompt(String text, String source) {
        this.text = text;
        this.source = source;
        setLength();
    }

    public String getText() {
        return text;
    }

    public String getSource() {
        return source;
    }

    public int getLength(){
        return length;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public void setText(String text) {
        this.text = text;
        setLength();
    }

    private void setLength() {
        length = this.text.split("\\s+").length;
    }
}
