package com.jhogne.typer.Model;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Random;

public class TextRetriever {

    private static final JSONParser parser = new JSONParser();

    private static int currentText = 0;
    /**
     * Gets a random text from the data.json file
     * @return A random text
     */
    public static String getRandomText() {
        String text = "";
        try {
            Object object = parser.parse(new FileReader("src/main/data/data.json"));

            //convert Object to JSONObject
            JSONArray jsonArray = (JSONArray) object;
            Random rand = new Random();
            int randIdx = rand.nextInt(jsonArray.size());
            JSONObject obj = (JSONObject) jsonArray.get(randIdx);
            text =  (String) obj.get("quote");
        }
        catch(ParseException | IOException e) {
            e.printStackTrace();
        }
        return text;
    }

    public static String getOrderedText() {
        String text = "";
        try {
            Object object = parser.parse(new FileReader("src/main/data/data.json"));

            //convert Object to JSONObject
            JSONArray jsonArray = (JSONArray) object;
            Random rand = new Random();
            JSONObject obj = (JSONObject) jsonArray.get(currentText);
            text =  (String) obj.get("quote");

            currentText++;
            if(currentText >= jsonArray.size()) {
                currentText = 0;
            }
        }
        catch(ParseException | IOException e) {
            e.printStackTrace();
        }
        return text;

    }
}
