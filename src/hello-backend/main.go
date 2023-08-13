package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var persons = []person{
	{Name: "World"},
	{Name: "Not World"},
}

type person struct {
	Name string `json:"name"`
}

func getNames(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, getPersonsFromDb())
}

func getPersonsFromDb() []person {
	return persons
}

func addPerson(name string) {
	var newPerson = person{Name: name}
	persons = append(persons, newPerson)
}

func main() {
	router := gin.Default()
	router.GET("/", getNames)
	router.POST("/add", func(c *gin.Context) {
		name := c.PostForm("name")
		addPerson(name)
		c.String(200, "Added %s", name)
	})

	router.Run("0.0.0.0:8080")
}
