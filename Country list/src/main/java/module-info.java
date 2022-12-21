module com.example.java_project_374996 {
    requires javafx.controls;
    requires javafx.fxml;

    requires org.controlsfx.controls;
    requires org.kordamp.bootstrapfx.core;

    opens com.example.java_project_374996 to javafx.fxml;
    exports com.example.java_project_374996;
}