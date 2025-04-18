class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title) //Showing title of story
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // Start story with Initial Location
    }
}

class Location extends Scene {

    create(key) {
        let locationData = key; // Given Location Data
        this.engine.show(this.engine.storyData.Locations[locationData]["Body"]); //Shows text by the body of the location data
        
        if(this.engine.storyData.Locations[locationData]["Choices"] !== undefined) { // Making sure the location has any choices
            for(let theChoice of this.engine.storyData.Locations[locationData]["Choices"]) { // Looping over location choices
                if (theChoice.BeenVisited === true || theChoice.Locked === true) { //If nodes have been visited already or is locked
                    continue;  
                } else {
                    this.engine.addChoice(theChoice.Text, theChoice); 
                }
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) { // Fix this
            if (choice.BeenVisited === false) {
                this.engine.show("&gt; "+choice.Text); 
                this.engine.show("&gt; "+choice.Response);
                choice.BeenVisited = true;
            } else {
                this.engine.show("&gt; "+choice.Text);
                this.engine.show
            }
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