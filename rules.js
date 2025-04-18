class Start extends Scene {
    create() {
        //this.engine.setTitle("Title goes here"); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.setTitle(this.engine.storyData.Title)
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        // this.engine.gotoScene(Location, "Home"); // TODO: replace this text by the initial location of the story
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Location extends Scene {
    create(key) {
        //let locationData = undefined; // TODO: use `key` to get the data object for the current story location
        let locationData = key;
        //this.engine.show("Body text goes here"); // TODO: replace this text by the Body of the location data
        this.engine.show(this.engine.storyData.Locations[locationData]["Body"]);
        
        //if(true) { // TODO: check if the location has any Choices
        if(this.engine.storyData.Locations[locationData]["Choices"] !== undefined) {
            //for(let choice of ["example data"]) { // TODO: loop over the location's Choices
            for(let theChoice of this.engine.storyData.Locations[locationData]["Choices"]) {
                //this.engine.addChoice("action text"); // TODO: use the Text of the choice
                this.engine.addChoice(theChoice.Text, theChoice);
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');