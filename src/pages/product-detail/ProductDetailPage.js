import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import { actFetchProductInforByIDRequest } from "../../actions/product";
import { actFetchEpisodesRequest } from "../../actions/episode";
import { actFetchCharactersRequest } from "../../actions/character";
import { useDispatch, useSelector } from "react-redux";
import EpisodeList from "../../components/episode-list/EpisodeList";
import EpisodeItem from "../../components/episode-item/EpisodeItem";
import CharacterItem from "../../components/character-item/CharacterItem";
import CharacterList from "../../components/character-list/CharacterList";

function ProductDetailPage(props) {
  //router
  var params = useParams();
  //redux
  const product = useSelector((state) => state.product);
  const episodes = useSelector((state) => state.episodes);
  const characters = useSelector((state) => state.characters);
  const dispatch = useDispatch();
  const fetchProductInfo = (productID) =>
    dispatch(actFetchProductInforByIDRequest(productID));
  const fetchEpisodes = (productID) =>
    dispatch(actFetchEpisodesRequest(productID));
  const fetchCharacters = (productID) =>
    dispatch(actFetchCharactersRequest(productID));

  useEffect(() => {
    fetchProductInfo(params.id);
    fetchEpisodes(params.id);
    fetchCharacters(params.id);
  }, []);

  const showEpisodes = () => {
    var result = null;
    if (episodes.length > 0) {
      result = episodes.map((episode, index) => {
        return <EpisodeItem key={index} episode={episode} />;
      });
    }
    return result;
  };

  const showCharacters = () => {
    var result = null;
    if (characters.length > 0) {
      result = characters.map((character, index) => {
        return <CharacterItem key={index} character={character} />;
      });
    }
    return result;
  };

  return (
    <div>
      <Menu />
      <div className="d-flex flex-column align-items-center mt-5">
        {/* Card */}
        <div className="card mb-5" style={{ width: "1000px" }}>
          <div className="row g-0">
            <div className="col-md-3">
              <img
                src={product.image}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <h5 className="card-title fw-bold">{product.name}</h5>
                <p className="card-text">{product.overview}</p>
              </div>
            </div>
          </div>
        </div>
        <EpisodeList>{showEpisodes()}</EpisodeList>
        <CharacterList>{showCharacters()}</CharacterList>
      </div>
    </div>
  );
}

export default ProductDetailPage;
