"use client"

const members = [
  { name: "Janosch Puhe", role: "Vocals & Songwriter" },
  { name: "Tarik Benatmane", role: "Bass & Backings" },
  { name: "Robií Crawford", role: "Guitar & Backings" },
  { name: "J.Ma Garcia Lopez", role: "Keyboards & Backings" },
  { name: "Otto Lorenz Contreras", role: "Drums & Backings" },
]

export function MembersSlide() {
  return (
    <section className="relative flex h-full w-full shrink-0 snap-start items-center justify-center overflow-hidden px-8 md:px-16 lg:px-20">
      <div className="w-full max-w-6xl">
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-4">
            The Band
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Meet the Musicians
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {members.map((member, index) => (
            <div
              key={member.name}
              className="group relative p-6 md:p-8 bg-card border border-border rounded-sm hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-6xl md:text-7xl font-bold text-muted/30 select-none">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="relative z-10">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground tracking-wider">
                  {member.role}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500" />
            </div>
          ))}

          {/* Six Nations Highlight */}
          <div className="p-6 md:p-8 bg-primary/10 border border-primary/30 rounded-sm flex flex-col justify-center">
            <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase mb-2">
              Diverse Origins
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Artists from diverse nationalities, united by their shared passion for music storytelling.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
