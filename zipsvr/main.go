package main

import "fmt"
import "net/http"
import "log"
import "os"
import "runtime"
import "encoding/json"
import "strings"
import "github.com/alexsirr/info344-in-class/zipsvr/models"

func helloHandler(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Query().Get("name")
    w.Header().Add("Content-Type", "text/plain")
    w.Header().Add("Access-Control-Allow-Origin", "*")
    //w.Write([]byte("hello world!"))
    fmt.Fprintf(w, "hello %s!", name)
}

func memoryHandler(w http.ResponseWriter, r *http.Request) {
    runtime.GC()
    stats := &runtime.MemStats{}
    runtime.ReadMemStats(stats)
    w.Header().Add("Content-Type", "application/json")
    w.Header().Add("Access-Control-Allow-Origin", "*")
    json.NewEncoder(w).Encode(stats)
}

func main() {
    addr := os.Getenv("ADDR")
    if len(addr) == 0 {
        addr = ":80"
    }
    zips, err := models.LoadZips("zips.csv")
    if err != nil {
        log.Fatalf("error loading zips: %v", err)
    }
    log.Printf("loaded %d zips", len(zips))

    cityIndex := models.ZipIndex{}
    for _, z := range zips {
        cityLower := strings.ToLower(z.City)
        cityIndex[cityLower] = append(cityIndex[cityLower], z)
    }

    mux := http.NewServeMux()
    mux.HandleFunc("/hello", helloHandler)
    mux.HandleFunc("/stats", memoryHandler)
    fmt.Printf("server is listening at http://%s\n", addr)
    log.Fatal(http.ListenAndServe(addr, mux))
}
