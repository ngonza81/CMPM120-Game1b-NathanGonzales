// Nathan Gonzales
// April 18, 2025 
// Key located in Karoke location (should have Locked1 & Locked2 choices in them)


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
        if (locationData === this.engine.storyData.InitialLocation) {
            this.engine.show(this.engine.storyData.Locations[locationData]["Body"]); //Shows text by the body of the location data
        }
        
        if(this.engine.storyData.Locations[locationData]["Choices"] !== undefined) { // Making sure the location has any choices
            for(let theChoice of this.engine.storyData.Locations[locationData]["Choices"]) { // Looping over location choices
                if (theChoice.BeenVisited === true || theChoice.Locked2 === true || theChoice.Locked1 === true) { //If nodes have been visited already or is locked
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
            if (choice.Text === "Grab the Mic and Sing!") { // Unlock the choice
                let karaoke = this.engine.storyData.Locations["Karoke"];
                if (karaoke.Choices) {
                    for (let c of karaoke.Choices) {
                        if (c.Text === "Where is the Cheetos?") {
                            c.Locked1 = false;
                        }   
                    }
                }
            } 
            if (choice.Text === "Where is the Cheetos?") { // Unlock the ending
                let nightMarket = this.engine.storyData.Locations["Night Market"];
                if (nightMarket.Choices) {
                    for (let c of nightMarket.Choices) {
                        if (c.Text === "On my way to get my Cheetos!") {
                            c.Locked2 = false;
                        }
                    }
                }
            }
            if (choice.BeenVisited === false) {
                this.engine.show("&gt; "+choice.Text); 
                this.engine.show(choice.Response); // Shows text of the response instead of body
                choice.BeenVisited = true;
            } else {
                this.engine.show("&gt; "+choice.Text);
                this.engine.show(this.engine.storyData.Locations[choice.Target]["Body"]); //Shows text by the body of the location data
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