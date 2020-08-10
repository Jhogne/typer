package com.jhogne.typer.Model;

import com.jhogne.typer.TyperApplication;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.boot.SpringApplication;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Random;

public class TextRetriever {

    private static final JSONParser parser = new JSONParser();

    private static int currentText = 0;

    /**
     * Gets a random prompt from the data.json file
     * @return A random prompt
     */
    public static Prompt getRandomText() {
        Prompt prompt = new Prompt("", "");
        try {
            Object object = parser.parse(new FileReader("src/main/data/data.json"));

            //convert Object to JSONObject
            JSONArray jsonArray = (JSONArray) object;
            Random rand = new Random();
            int randIdx = rand.nextInt(jsonArray.size());
            JSONObject obj = (JSONObject) jsonArray.get(randIdx);
            prompt.setText((String) obj.get("quote"));
            prompt.setSource((String) obj.get("source"));

        }
        catch(ParseException | IOException e) {
            e.printStackTrace();
        }
        return prompt;
    }

    /**
     * Gets an ordered prompt from the data.json file. Use for debugging/testing purposes
     * @return An ordered prompt
     */
    public static Prompt getOrderedText() {
        Prompt prompt = new Prompt("", "");
        try {
            Object object = parser.parse(new FileReader("src/main/data/data.json"));

            //convert Object to JSONObject
            JSONArray jsonArray = (JSONArray) object;
            JSONObject obj = (JSONObject) jsonArray.get(currentText);
            prompt.setText((String) obj.get("quote"));
            prompt.setSource((String) obj.get("source"));

            currentText++;
            if(currentText >= jsonArray.size()) {
                currentText = 0;
            }
        }
        catch(ParseException | IOException e) {
            e.printStackTrace();
        }
        return prompt;
    }

}
