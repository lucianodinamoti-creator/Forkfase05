import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, Crown, Medal, Award, Calendar, MapPin, Users,
  Target, Sparkles, Flame, BookOpen, Goal, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { worldCups, getWorldCupByYear } from '@/data/world-cups';
import { participantsByYear, finalLineupsByYear } from '@/data/world-cups-extra';

const WorldCupDetail: React.FC = () => {
  const { year } = useParams<{ year: string }>();
  const cup = year ? getWorldCupByYear(parseInt(year)) : undefined;

  if (!cup) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Copa não encontrada</h1>
          <Link to="/historia">
            <Button>Voltar à história das Copas</Button>
          </Link>
        </div>
      </div>
    );
  }

  const flagUrl = `https://flagcdn.com/w320/${cup.host.iso}.png`;

  // Navegação anterior/próxima
  const idx = worldCups.findIndex((c) => c.year === cup.year);
  const prev = idx > 0 ? worldCups[idx - 1] : null;
  const next = idx < worldCups.length - 1 ? worldCups[idx + 1] : null;

  const getTeamFlag = (iso?: string) =>
    iso ? `https://flagcdn.com/w80/${iso}.png` : null;

  // Dados extras
  const participants = participantsByYear[cup.year] || [];
  const finalLineup = finalLineupsByYear[cup.year];

  return (
    <div className="min-h-screen">
      {/* Hero com bandeira gigante */}
      <div className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <img
          src={flagUrl}
          alt={cup.host.name}
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />

        <Link to="/historia" className="absolute top-24 left-4 md:left-8 z-10">
          <Button variant="outline" className="glass-card">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Todas as Copas
          </Button>
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            {cup.upcoming && (
              <Badge className="bg-gold text-primary-foreground mb-3">
                <Sparkles className="w-3 h-3 mr-1" />
                Próxima edição
              </Badge>
            )}
            <h1 className="font-display text-6xl md:text-8xl mb-2 leading-none">
              {cup.year}
            </h1>
            <div className="flex items-center gap-3 text-xl md:text-2xl text-muted-foreground">
              <MapPin className="w-6 h-6 text-primary" />
              <span>Copa do Mundo · {cup.host.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Stats topo: Final + Campeão */}
        {!cup.upcoming && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <Card className="rounded-2xl border-gold/30 bg-gradient-to-br from-gold/15 via-gold/5 to-transparent">
              <CardContent className="pt-6 text-center">
                <Crown className="w-10 h-10 text-gold mx-auto mb-2" />
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  Campeão
                </div>
                <div className="font-display text-2xl mt-1 flex items-center justify-center gap-2">
                  {getTeamFlag(cup.podium.championIso) && (
                    <img
                      src={getTeamFlag(cup.podium.championIso)!}
                      alt={cup.podium.champion}
                      className="w-8 h-5 object-cover rounded"
                    />
                  )}
                  {cup.podium.champion}
                </div>
                <div className="text-sm text-muted-foreground mt-2 font-medium">
                  {cup.finalScore}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="pt-6 text-center">
                <Medal className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  Vice-campeão
                </div>
                <div className="font-display text-2xl mt-1 flex items-center justify-center gap-2">
                  {getTeamFlag(cup.podium.runnerUpIso) && (
                    <img
                      src={getTeamFlag(cup.podium.runnerUpIso)!}
                      alt={cup.podium.runnerUp}
                      className="w-8 h-5 object-cover rounded"
                    />
                  )}
                  {cup.podium.runnerUp}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="pt-6 text-center">
                <Award className="w-10 h-10 text-amber-700 mx-auto mb-2" />
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  3º lugar
                </div>
                <div className="font-display text-2xl mt-1 flex items-center justify-center gap-2">
                  {getTeamFlag(cup.podium.thirdPlaceIso) && (
                    <img
                      src={getTeamFlag(cup.podium.thirdPlaceIso)!}
                      alt={cup.podium.thirdPlace}
                      className="w-8 h-5 object-cover rounded"
                    />
                  )}
                  {cup.podium.thirdPlace}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Grid principal de conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal: narrativa */}
          <div className="lg:col-span-2 space-y-8">
            {/* História */}
            <Card className="rounded-2xl border-border">
              <CardContent className="p-6">
                <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  A história desta Copa
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {cup.history.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Curiosidades */}
            <Card className="rounded-2xl border-border">
              <CardContent className="p-6">
                <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Curiosidades e fatos marcantes
                </h2>
                <ul className="space-y-3">
                  {cup.curiosities.map((c, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                      <span className="text-primary mt-1 flex-shrink-0">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Jogo memorável */}
            {cup.notableMatch && (
              <Card className="rounded-2xl border-border bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-6">
                  <h2 className="font-display text-2xl mb-3 flex items-center gap-2">
                    <Flame className="w-6 h-6 text-primary" />
                    {cup.upcoming ? 'Destaque' : 'Jogo memorável'}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {cup.notableMatch}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Seleções participantes */}
            {participants.length > 0 && (
              <Card className="rounded-2xl border-border">
                <CardContent className="p-6">
                  <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-primary" />
                    Seleções participantes
                    <span className="text-base text-muted-foreground font-normal ml-1">
                      ({participants.length})
                    </span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {participants.map((p) => {
                      const isChampion = p.name === cup.podium.champion;
                      const isRunnerUp = p.name === cup.podium.runnerUp;
                      const isThird = p.name === cup.podium.thirdPlace;
                      return (
                        <div
                          key={p.name}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${
                            isChampion
                              ? 'border-gold/40 bg-gold/10'
                              : isRunnerUp
                              ? 'border-slate-400/40 bg-slate-400/10'
                              : isThird
                              ? 'border-amber-700/40 bg-amber-700/5'
                              : 'border-border bg-secondary/30'
                          }`}
                        >
                          <img
                            src={`https://flagcdn.com/w40/${p.iso}.png`}
                            alt={p.name}
                            className="w-6 h-4 object-cover rounded flex-shrink-0"
                            loading="lazy"
                          />
                          <span className="truncate flex-1">{p.name}</span>
                          {isChampion && <Crown className="w-3 h-3 text-gold flex-shrink-0" />}
                          {isRunnerUp && <Medal className="w-3 h-3 text-slate-400 flex-shrink-0" />}
                          {isThird && <Award className="w-3 h-3 text-amber-700 flex-shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Escalações da final */}
            {finalLineup && (
              <Card className="rounded-2xl border-border">
                <CardContent className="p-6">
                  <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
                    <Goal className="w-6 h-6 text-primary" />
                    Escalações da final
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[finalLineup.home, finalLineup.away].map((side, sideIdx) => {
                      const isWinner = sideIdx === 0; // home é sempre o vencedor nos meus dados
                      return (
                        <div
                          key={side.team}
                          className={`rounded-xl border p-4 ${
                            isWinner
                              ? 'border-gold/40 bg-gold/5'
                              : 'border-border bg-secondary/20'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border">
                            <img
                              src={`https://flagcdn.com/w80/${side.iso}.png`}
                              alt={side.team}
                              className="w-10 h-7 object-cover rounded"
                            />
                            <div className="flex-1">
                              <div className="font-display text-lg flex items-center gap-2">
                                {side.team}
                                {isWinner && <Crown className="w-4 h-4 text-gold" />}
                              </div>
                              {side.coach && (
                                <div className="text-xs text-muted-foreground">
                                  Téc. {side.coach}
                                </div>
                              )}
                            </div>
                          </div>
                          <ol className="space-y-1.5 text-sm">
                            {side.players.map((p, i) => (
                              <li
                                key={p.name}
                                className="flex items-center gap-2 py-1"
                              >
                                <span className="font-mono text-xs text-muted-foreground w-5 text-right flex-shrink-0">
                                  {i + 1}.
                                </span>
                                <span className="flex-1">
                                  {p.name}
                                  {p.ownGoal && (
                                    <span className="text-xs text-muted-foreground ml-1">
                                      (gol contra)
                                    </span>
                                  )}
                                </span>
                                {p.goals && p.goals > 0 && (
                                  <span className="flex items-center gap-0.5">
                                    {Array.from({ length: p.goals }).map((_, gIdx) => (
                                      <span
                                        key={gIdx}
                                        className="text-base leading-none"
                                        title={`Gol${p.goals! > 1 ? ` ${gIdx + 1}` : ''}${p.ownGoal ? ' contra' : ''}`}
                                        aria-label="Gol marcado"
                                        role="img"
                                      >
                                        ⚽
                                      </span>
                                    ))}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ol>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
                    <span aria-hidden>⚽</span>
                    <span>Bola ao lado do nome indica gol marcado pelo jogador na final</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar com fatos rápidos */}
          <div className="space-y-6">
            {/* Detalhes do torneio */}
            <Card className="rounded-2xl border-border">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display text-lg">Detalhes do torneio</h3>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-muted-foreground">Período</div>
                    <div className="text-sm font-medium">{cup.dates}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-muted-foreground">Seleções</div>
                    <div className="text-sm font-medium">{cup.teams} países participantes</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Goal className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-muted-foreground">Partidas</div>
                    <div className="text-sm font-medium">
                      {cup.matches} jogos
                      {cup.goalsTotal && ` · ${cup.goalsTotal} gols (média ${(cup.goalsTotal / cup.matches).toFixed(2)}/jogo)`}
                    </div>
                  </div>
                </div>

                {cup.attendance && (
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">Público total</div>
                      <div className="text-sm font-medium">{cup.attendance}</div>
                    </div>
                  </div>
                )}

                {!cup.upcoming && (
                  <div className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">Final</div>
                      <div className="text-sm font-medium">{cup.finalVenue}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Artilheiro */}
            {!cup.upcoming && cup.topScorer && (
              <Card className="rounded-2xl border-border bg-gradient-to-br from-gold/15 to-transparent">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-gold" />
                    <span className="text-xs uppercase tracking-wider text-gold font-medium">
                      Chuteira de Ouro
                    </span>
                  </div>
                  <div className="font-display text-xl">{cup.topScorer.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {cup.topScorer.country}
                    {cup.topScorer.goals !== undefined && (
                      <span className="ml-2 text-foreground font-medium">
                        · {cup.topScorer.goals} gols
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Bola de Ouro */}
            {!cup.upcoming && cup.goldenBall && (
              <Card className="rounded-2xl border-border bg-gradient-to-br from-primary/10 to-transparent">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-primary" />
                    <span className="text-xs uppercase tracking-wider text-primary font-medium">
                      Bola de Ouro
                    </span>
                  </div>
                  <div className="font-display text-xl">{cup.goldenBall.name}</div>
                  <div className="text-sm text-muted-foreground">{cup.goldenBall.country}</div>
                </CardContent>
              </Card>
            )}

            {/* Melhor jovem */}
            {!cup.upcoming && cup.bestYoungPlayer && (
              <Card className="rounded-2xl border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-xs uppercase tracking-wider text-primary font-medium">
                      Melhor jovem do torneio
                    </span>
                  </div>
                  <div className="font-display text-xl">{cup.bestYoungPlayer.name}</div>
                  <div className="text-sm text-muted-foreground">{cup.bestYoungPlayer.country}</div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Navegação anterior/próxima */}
        <div className="grid grid-cols-2 gap-4 mt-12 max-w-4xl mx-auto">
          {prev ? (
            <Link to={`/historia/${prev.year}`}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <ChevronLeft className="w-6 h-6 text-primary flex-shrink-0" />
                  <div className="text-right ml-auto">
                    <div className="text-xs text-muted-foreground">Anterior</div>
                    <div className="font-display text-lg">{prev.year}</div>
                    <div className="text-sm text-muted-foreground">{prev.host.name}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link to={`/historia/${next.year}`}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Próxima</div>
                    <div className="font-display text-lg">{next.year}</div>
                    <div className="text-sm text-muted-foreground">{next.host.name}</div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-primary flex-shrink-0 ml-auto" />
                </CardContent>
              </Card>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorldCupDetail;
