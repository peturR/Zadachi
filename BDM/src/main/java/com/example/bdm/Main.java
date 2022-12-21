package com.example.bdm;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;

import javafx.scene.control.Label;

public class Main extends Application {

    private Stage window;

    /**
     * create the BMI Calculator user interface scene
     * @return an integrated scene ready for window display
     */
    public Scene buildScene() {
        // CREATE COMPONENTS
        // create Height and Weight labels
        Label heightLabel = new Label("Height:");
        Label weightLabel = new Label("Weight:");
        // create height and weight text fields
        TextField heightInput = new TextField();
        heightInput.setPromptText("Enter numbers");
        TextField weightInput = new TextField();
        weightInput.setPromptText("Enter numbers");
        // create height and weight unit label
        Label heightUnitLabel = new Label("cm");
        Label weightUnitLabel = new Label("kg");

        // create the Calculate button and its functionality
        Button calcButton = new Button();
        calcButton.setText("Calculate");
        calcButton.setOnAction(e -> {
            Double bmi = calculateBMI(heightInput, weightInput);
            if (bmi != null) {
                displayBMI(bmi);
            }
        });

        // create a GridPane layout
        GridPane grid = new GridPane();
        grid.setPadding(new Insets(10,10,10,10));
        grid.setVgap(10);
        grid.setHgap(10);

        // set constraints beforehand!
        GridPane.setConstraints(heightLabel, 0,0);
        GridPane.setConstraints(weightLabel, 0,1);
        GridPane.setConstraints(heightInput,1,0);
        GridPane.setConstraints(weightInput, 1,1);
        GridPane.setConstraints(heightUnitLabel,2,0);
        GridPane.setConstraints(weightUnitLabel,2,1);
        GridPane.setConstraints(calcButton,1,2);
        // add the Height and Weight labels onto layout
        grid.getChildren().addAll(heightLabel, weightLabel, heightInput, weightInput,
                heightUnitLabel,weightUnitLabel,calcButton);


        // create a new scene and apply the layout to it
        return new Scene(grid, 300,120);
    }

    public Double calculateBMI(TextField heightInput, TextField weightInput) {
        Double bmi = null;
        try {
            double height = Double.parseDouble(heightInput.getText()) / 100;
            double weight = Double.parseDouble(weightInput.getText());
            if (height <= 0 || weight <= 0) {
                throw new IllegalArgumentException();
            }
            bmi = new Double(weight / (height * height));
        } catch(NumberFormatException e1) {
            AlertBox.display("Error", "Height and Weight\nmust be numerical!");
        } catch(IllegalArgumentException e2) {
            AlertBox.display("Error", "Height and Weight\nmust be positive!");
        }

        // Illegal input by user, delete their inputs
        if (bmi == null) {
            heightInput.setText("");
            weightInput.setText("");
        }

        return bmi;
    }

    public void displayBMI(double bmi) {
        String comment;
        if (bmi >=40) {
            comment = "are very extremely obese";
        } else if (bmi >= 35) {
            comment = "are extremely obese";
        } else if (bmi >= 30) {
            comment = "are moderately obese";
        } else if (bmi >= 25) {
            comment = "are slightly overweight";
        } else if (bmi >= 18.5) {
            comment = "have a healthy weight";
        } else if (bmi >= 16) {
            comment = "are slightly underweight";
        } else if (bmi >= 15) {
            comment = "are moderately underweight";
        } else {
            comment = "are extremely underweight";
        }
        AlertBox.display("Result", String.format("Your BMI is %.2f,\n You %s.",bmi, comment));
    }

    public void start(Stage primaryStage) {
        window = primaryStage;
        window.setTitle("BMI Calculator");

        Scene scene = buildScene();
        window.setScene(scene);

        window.setOnCloseRequest(e -> {
            e.consume();
            Boolean response = ConfirmBox.display("Closing", "Are you sure to exit?");
            if (response != null && response == true) {
                window.close();
            }
        });

        window.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}