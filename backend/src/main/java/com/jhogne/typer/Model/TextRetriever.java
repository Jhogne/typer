package com.jhogne.typer.Model;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Random;

public class TextRetriever {

    private JSONParser parser;
    private JSONArray jsonArray;

    private  int currentText;

    public TextRetriever(){
        parser = new JSONParser();
        currentText = 0;

        InputStream in = getClass().getResourceAsStream("/data.json");
        Object object = null;
        try {
            object = parser.parse(new BufferedReader(new InputStreamReader(in)));
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        jsonArray = (JSONArray) object;

    }

    /**
     * Gets a random prompt from the data.json file
     * @return A random prompt
     */
    public  Prompt getRandomText() {
        Prompt prompt = new Prompt("", "");
        Random rand = new Random();
        int randIdx = rand.nextInt(jsonArray.size());
        JSONObject obj = (JSONObject) jsonArray.get(randIdx);
        prompt.setText((String) obj.get("quote"));
        prompt.setSource((String) obj.get("source"));

        return prompt;
    }

    /**
     * Gets an ordered prompt from the data.json file. Use for debugging/testing purposes
     * @return An ordered prompt
     */
    public  Prompt getOrderedText() {
        Prompt prompt = new Prompt("", "");
        JSONObject obj = (JSONObject) jsonArray.get(currentText);
        prompt.setText((String) obj.get("quote"));
        prompt.setSource((String) obj.get("source"));

        currentText++;
        if(currentText >= jsonArray.size()) {
            currentText = 0;
        }
        return prompt;
    }

}
