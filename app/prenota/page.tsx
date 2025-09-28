"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Mail, Phone, MapPin, Clock, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const roomImages = [
  {
    src: "/images/room-1.jpg",
    alt: "Camera Deluxe con vista panoramica",
    title: "Camera Deluxe",
    description: "Elegante camera con vista sui colli romani",
  },
  {
    src: "/images/room-2.jpg",
    alt: "Suite Panoramica con terrazza privata",
    title: "Suite Panoramica",
    description: "Lussuosa suite con terrazza e vista mozzafiato",
  },
  {
    src: "/images/room-3.jpg",
    alt: "Camera Familiare spaziosa",
    title: "Camera Familiare",
    description: "Perfetta per famiglie, ampia e confortevole",
  },
  {
    src: "/images/romantic-room.jpg",
    alt: "Camera Romantica con decorazioni speciali",
    title: "Camera Romantica",
    description: "Atmosfera intima per coppie innamorate",
  },
]

export default function BookingPage() {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    roomType: "",
    specialRequests: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking form submitted:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % roomImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + roomImages.length) % roomImages.length)
  }

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div
            ref={heroRef}
            className={`text-center mb-12 transition-all duration-1000 ${heroVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-[50px]"}`}
          >
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-roman-gradient mb-4 animate-text-shimmer">
              Prenota il Tuo Soggiorno
            </h1>
            <p
              className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              Vivi un'esperienza indimenticabile nel cuore della Città Eterna
            </p>
          </div>

          <div
            ref={carouselRef}
            className={`mb-16 transition-all duration-1000 delay-300 ${carouselVisible ? "animate-slide-in-up opacity-100" : "opacity-0 translate-y-[30px]"}`}
          >
            <Card className="card-enhanced overflow-hidden">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-cinzel text-roman-gradient">Le Nostre Camere</CardTitle>
                <CardDescription>Scopri dove soggiornerai durante la tua visita a Roma</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  {/* Main carousel image */}
                  <div className="relative h-96 md:h-[500px] overflow-hidden">
                    <Image
                      src={
                        roomImages[currentImageIndex]?.src ||
                        `/placeholder.svg?height=500&width=800&query=${roomImages[currentImageIndex]?.title} luxury room`
                      }
                      alt={roomImages[currentImageIndex]?.alt || "Camera di lusso"}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Room info overlay */}
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-cinzel font-bold mb-2">{roomImages[currentImageIndex]?.title}</h3>
                      <p className="text-lg opacity-90">{roomImages[currentImageIndex]?.description}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-2 text-sm">5.0 stelle</span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation arrows */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/20"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/20"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>

                  {/* Dots indicator */}
                  <div className="absolute bottom-4 right-6 flex gap-2">
                    {roomImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>

                {/* Thumbnail strip */}
                <div className="p-4 bg-secondary/20">
                  <div className="grid grid-cols-4 gap-3">
                    {roomImages.map((image, index) => (
                      <button
                        key={index}
                        className={`relative h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                          index === currentImageIndex
                            ? "ring-2 ring-primary scale-105"
                            : "hover:scale-105 opacity-70 hover:opacity-100"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <Image
                          src={image.src || `/placeholder.svg?height=80&width=120&query=${image.title} thumbnail`}
                          alt={image.alt}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Booking Form */}
            <Card className="card-enhanced animate-slide-in-left">
              <CardHeader>
                <CardTitle className="text-2xl font-cinzel text-primary">Dettagli Prenotazione</CardTitle>
                <CardDescription>Compila il modulo per prenotare il tuo soggiorno</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefono</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="guests">Numero Ospiti</Label>
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="1">1 Ospite</option>
                        <option value="2">2 Ospiti</option>
                        <option value="3">3 Ospiti</option>
                        <option value="4">4 Ospiti</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkIn">Check-in</Label>
                      <Input
                        id="checkIn"
                        name="checkIn"
                        type="date"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkOut">Check-out</Label>
                      <Input
                        id="checkOut"
                        name="checkOut"
                        type="date"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="roomType">Tipo Camera</Label>
                    <select
                      id="roomType"
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-input rounded-md bg-background"
                      required
                    >
                      <option value="">Seleziona una camera</option>
                      <option value="deluxe">Camera Deluxe</option>
                      <option value="suite">Suite Panoramica</option>
                      <option value="family">Camera Familiare</option>
                      <option value="romantic">Camera Romantica</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Richieste Speciali</Label>
                    <Textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Eventuali richieste particolari..."
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Conferma Prenotazione
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Booking Info */}
            <div className="space-y-6 animate-slide-in-right">
              <Card className="card-enhanced">
                <CardHeader>
                  <CardTitle className="text-xl font-cinzel text-primary flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Informazioni Check-in/Check-out
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Check-in: 15:00 - 20:00</p>
                      <p className="text-sm text-muted-foreground">Check-out: 08:00 - 11:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Capacità massima: 4 ospiti per camera</p>
                      <p className="text-sm text-muted-foreground">Bambini sotto i 3 anni gratis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-enhanced">
                <CardHeader>
                  <CardTitle className="text-xl font-cinzel text-primary flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Come Raggiungerci
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    <strong>Indirizzo:</strong>
                    <br />
                    Via dei Colli Romani, 123
                    <br />
                    00100 Roma, Italia
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <strong>Dall'Aeroporto di Fiumicino:</strong> 45 minuti in auto
                    </p>
                    <p className="text-sm">
                      <strong>Dalla Stazione Termini:</strong> 20 minuti in metro
                    </p>
                    <p className="text-sm">
                      <strong>Dal Colosseo:</strong> 15 minuti a piedi
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-enhanced">
                <CardHeader>
                  <CardTitle className="text-xl font-cinzel text-primary flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contatti Diretti
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>+39 06 1234 5678</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>info@villabellavista.it</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Per prenotazioni urgenti o richieste speciali, non esitare a contattarci direttamente.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
