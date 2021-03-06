import {IActionCard} from './ICard';
import {IProjectCard} from './IProjectCard';
import {Tags} from './Tags';
import {CardType} from './CardType';
import {Player} from '../Player';
import {Game} from '../Game';
import { CardName } from '../CardName';
import { PartyHooks } from '../turmoil/parties/PartyHooks';
import { PartyName } from '../turmoil/parties/PartyName';
import { MAX_OCEAN_TILES, REDS_RULING_POLICY_COST } from '../constants';

export class AquiferPumping implements IActionCard, IProjectCard {
    public cost: number = 18;
    public tags: Array<Tags> = [Tags.STEEL];
    public name: CardName = CardName.AQUIFER_PUMPING;
    public cardType: CardType = CardType.ACTIVE;

    public play() {
      return undefined;
    }
    public canAct(player: Player, game: Game): boolean {
      const oceansMaxed = game.board.getOceansOnBoard() === MAX_OCEAN_TILES;
      if (oceansMaxed) return false;

      let oceanCost = 8;

      if (PartyHooks.shouldApplyPolicy(game, PartyName.REDS)) {
        return player.canAfford(oceanCost + REDS_RULING_POLICY_COST, game, true, false);
      }

      return player.canAfford(oceanCost, game, true, false);
    }
    public action(player: Player, game: Game) {
      game.addSelectHowToPayInterrupt(player, 8, true, false, "Select how to pay for action");
      game.addOceanInterrupt(player);
      return undefined;
    }
}
