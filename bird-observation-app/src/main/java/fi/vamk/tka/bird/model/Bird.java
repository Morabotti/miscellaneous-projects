package fi.vamk.tka.bird.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Bird {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String textid;
    private String finnish;
    private String latin;
    private String swedish;
    private String english;

    public Bird() {
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTextid() {
        return this.textid;
    }

    public void setTextid(String textid) {
        this.textid = textid;
    }

    public String getFinnish() {
        return this.finnish;
    }

    public void setFinnish(String finnish) {
        this.finnish = finnish;
    }

    public String getLatin() {
        return this.latin;
    }

    public void setLatin(String latin) {
        this.latin = latin;
    }

    public String getSwedish() {
        return this.swedish;
    }

    public void setSwedish(String swedish) {
        this.swedish = swedish;
    }

    public String getEnglish() {
        return this.english;
    }

    public void setEnglish(String english) {
        this.english = english;
    }

}
